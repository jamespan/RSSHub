const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');

module.exports = async (ctx) => {
    const res = await got({
        url: 'https://www.investors.com/wp-admin/admin-ajax.php?id=&post_id=501&slug=investors-corner&canonical_url=https://www.investors.com/category/how-to-invest/investors-corner/&posts_per_page=6&page=0&offset=0&post_type=post&repeater=default&seo_start_page=1&preloaded=false&preloaded_amount=0&category=investors-corner&order=DESC&orderby=date&action=alm_get_posts&query_type=standard',
        method: 'get',
        headers: {
            Accept: 'application/json',
            Referer: 'https://www.investors.com/category/how-to-invest/investors-corner/',
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
                pubDate: parseDate(c('.entry-meta').text()),
                description: c('p:nth-child(4)').text(),
            };
        })
        .get();
    const items = await Promise.all(list);
    ctx.state.data = {
        title: 'IBD Investors Corner',
        link: `https://www.investors.com/category/how-to-invest/investors-corner/`,
        description: 'IBD Investors Corner',
        item: items,
        
    };
};
