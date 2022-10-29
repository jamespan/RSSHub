const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');
const timezone = require('@/utils/timezone');

async function items(ctx, url, referer, title) {
    const res = await got({
        url,
        method: 'get',
        headers: {
            Accept: 'application/json',
            Referer: referer,
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/106.0.0.0 Safari/537.36',
            'Sec-Fetch-Mode': 'cors',
            'X-Requested-With': 'XMLHttpRequest',
            'Accept-Language': 'zh-CN,zh;q=0.9',
            'Accept-Encoding': 'gzip',
        },
    });
    const $ = cheerio.load(res.data.html);

    const list = $('li')
        .map((_, e) => {
            const c = cheerio.load(e);
            return {
                title: c('h3 a').text(),
                link: String(c('h3 a').attr('href')),
                pubDate: timezone(parseDate(c('.entry-meta').text()), -4),
                description: `${c('p:nth-child(4)').text()}\n<img src="${c('img').attr('src')}" />`,
            };
        })
        .get();
    const items = await Promise.all(list);
    ctx.state.data = {
        title,
        link: referer,
        description: title,
        item: items,
    };
}

const metas = {
    '/investors-corner': {
        url: 'https://www.investors.com/wp-admin/admin-ajax.php?id=&post_id=501&slug=investors-corner&canonical_url=https://www.investors.com/category/how-to-invest/investors-corner/&posts_per_page=6&page=0&offset=0&post_type=post&repeater=default&seo_start_page=1&preloaded=false&preloaded_amount=0&category=investors-corner&order=DESC&orderby=date&action=alm_get_posts&query_type=standard',
        referer: 'https://www.investors.com/category/research/swing-trading/',
        title: 'IBD Investors Corner',
    },
    '/stock-market-today': {
        url: 'https://www.investors.com/wp-admin/admin-ajax.php?id=&post_id=504&slug=stock-market-today&canonical_url=https://www.investors.com/category/market-trend/stock-market-today/&posts_per_page=6&page=0&offset=0&post_type=post&repeater=default&seo_start_page=1&preloaded=false&preloaded_amount=0&category=stock-market-today&order=DESC&orderby=date&action=alm_get_posts&query_type=standard',
        referer: 'https://www.investors.com/category/stock-market-today/',
        title: 'IBD Stock Market Today',
    },
    '/the-big-picture': {
        url: 'https://www.investors.com/wp-admin/admin-ajax.php?id=&post_id=505&slug=the-big-picture&canonical_url=https://www.investors.com/category/market-trend/the-big-picture/&posts_per_page=6&page=0&offset=0&post_type=post&repeater=default&seo_start_page=1&preloaded=false&preloaded_amount=0&category=the-big-picture&order=DESC&orderby=date&action=alm_get_posts&query_type=standard',
        referer: 'https://www.investors.com/category/market-trend/the-big-picture/',
        title: 'IBD The Big Picture',
    },
    '/research/stock-of-the-day': {
        url: 'https://www.investors.com/wp-admin/admin-ajax.php?id=&post_id=243010&slug=ibd-stock-of-the-day&canonical_url=https://www.investors.com/category/research/ibd-stock-of-the-day/&posts_per_page=6&page=0&offset=0&post_type=post&repeater=default&seo_start_page=1&preloaded=false&preloaded_amount=0&category=ibd-stock-of-the-day&order=DESC&orderby=date&action=alm_get_posts&query_type=standard',
        referer: 'https://www.investors.com/category/ibd-stock-of-the-day/',
        title: 'IBD Stock of The Day',
    },
    '/stock-of-the-day': {
        url: 'https://www.investors.com/wp-admin/admin-ajax.php?id=&post_id=243010&slug=ibd-stock-of-the-day&canonical_url=https://www.investors.com/category/research/ibd-stock-of-the-day/&posts_per_page=6&page=0&offset=0&post_type=post&repeater=default&seo_start_page=1&preloaded=false&preloaded_amount=0&category=ibd-stock-of-the-day&order=DESC&orderby=date&action=alm_get_posts&query_type=standard',
        referer: 'https://www.investors.com/category/ibd-stock-of-the-day/',
        title: 'IBD Stock of The Day',
    },
    '/screen-of-the-day': {
        url: 'https://www.investors.com/wp-admin/admin-ajax.php?id=&post_id=516377&slug=ibd-screen-of-the-day&canonical_url=https://www.investors.com/tag/ibd-screen-of-the-day/&posts_per_page=5&page=0&offset=0&post_type=post&repeater=default&seo_start_page=1&preloaded=false&preloaded_amount=0&tag=ibd-screen-of-the-day&order=DESC&orderby=date&action=alm_get_posts&query_type=standard',
        referer: 'https://www.investors.com/tag/ibd-screen-of-the-day/',
        title: 'IBD Screen of The Day',
    },
    '/research/swing-trading': {
        url: 'https://www.investors.com/wp-admin/admin-ajax.php?id=&post_id=171069&slug=swing-trading&canonical_url=https://www.investors.com/category/research/swing-trading/&posts_per_page=6&page=0&offset=0&post_type=post&repeater=default&seo_start_page=1&preloaded=false&preloaded_amount=0&category=swing-trading&order=DESC&orderby=date&action=alm_get_posts&query_type=standard',
        referer: 'https://www.investors.com/category/research/swing-trading/',
        title: 'IBD Swing Treading Research',
    },
    '/research/investing-action-plan': {
        url: 'https://www.investors.com/wp-admin/admin-ajax.php?id=&post_id=171447&slug=investing-action-plan&canonical_url=https://www.investors.com/category/research/investing-action-plan/&posts_per_page=6&page=0&offset=0&post_type=post&repeater=default&seo_start_page=1&preloaded=false&preloaded_amount=0&category=investing-action-plan&order=DESC&orderby=date&action=alm_get_posts&query_type=standard',
        referer: 'https://www.investors.com/category/research/investing-action-plan/',
        title: 'IBD Investing Action Plan',
    },
    '/research/stock-analysis': {
        url: 'https://www.investors.com/wp-admin/admin-ajax.php?id=&post_id=535&slug=ibd-stock-analysis&canonical_url=https://www.investors.com/category/research/ibd-stock-analysis/&posts_per_page=6&page=0&offset=0&post_type=post&repeater=default&seo_start_page=1&preloaded=false&preloaded_amount=0&category=ibd-stock-analysis&order=DESC&orderby=date&action=alm_get_posts&query_type=standard',
        referer: 'https://www.investors.com/category/research/ibd-stock-analysis/',
        title: 'IBD Stock Analysis',
    },
    '/stock-lists/stocks-near-a-buy-zone': {
        url: 'https://www.investors.com/wp-admin/admin-ajax.php?id=&post_id=171900&slug=stocks-near-a-buy-zone&canonical_url=https://www.investors.com/category/stock-lists/stocks-near-a-buy-zone/&posts_per_page=6&page=0&offset=0&post_type=post&repeater=default&seo_start_page=1&preloaded=false&preloaded_amount=0&category=stocks-near-a-buy-zone&order=DESC&orderby=date&action=alm_get_posts&query_type=standard',
        referer: 'https://www.investors.com/category/stock-lists/stocks-near-a-buy-zone/',
        title: 'IBD Stocks Near a Buy Zone',
    },
};

async function template(ctx) {
    const path = ctx.path;
    const meta = metas[path];
    return await items(ctx, meta.url, meta.referer, meta.title);
}

module.exports = {
    items,
    template,
};
