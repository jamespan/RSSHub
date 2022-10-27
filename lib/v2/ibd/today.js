const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');
const timezone = require('@/utils/timezone');

module.exports = async (ctx) => {
    const res = await got({
        url: 'https://www.investors.com/wp-admin/admin-ajax.php?id=&post_id=504&slug=stock-market-today&canonical_url=https://www.investors.com/category/market-trend/stock-market-today/&posts_per_page=6&page=0&offset=0&post_type=post&repeater=default&seo_start_page=1&preloaded=false&preloaded_amount=0&category=stock-market-today&order=DESC&orderby=date&action=alm_get_posts&query_type=standard',
        method: 'get',
        headers: {
            Accept: 'application/json',
            Referer: 'https://www.investors.com/category/stock-market-today/',
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
        title: 'IBD Stock Market Today',
        link: 'https://www.investors.com/category/stock-market-today/',
        description: 'IBD Stock Market Today',
        item: items,
    };
};
