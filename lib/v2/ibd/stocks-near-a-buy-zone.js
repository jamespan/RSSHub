const ajax = require('./admin-ajax');

module.exports = async (ctx) => {
    await ajax.items(
        ctx,
        'https://www.investors.com/wp-admin/admin-ajax.php?id=&post_id=171900&slug=stocks-near-a-buy-zone&canonical_url=https://www.investors.com/category/stock-lists/stocks-near-a-buy-zone/&posts_per_page=6&page=0&offset=0&post_type=post&repeater=default&seo_start_page=1&preloaded=false&preloaded_amount=0&category=stocks-near-a-buy-zone&order=DESC&orderby=date&action=alm_get_posts&query_type=standard',
        'https://www.investors.com/category/stock-lists/stocks-near-a-buy-zone/',
        'IBD Stocks Near a Buy Zone'
    );
};
