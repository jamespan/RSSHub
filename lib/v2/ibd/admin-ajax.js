const got = require('@/utils/got');
const cheerio = require('cheerio');
const { parseDate } = require('@/utils/parse-date');
const timezone = require('@/utils/timezone');

async function items(ctx, url, referer, title) {
    const res = await got({
        url: url,
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
        title: title,
        link: referer,
        description: title,
        item: items,
    };
}

module.exports = {
    items,
};
