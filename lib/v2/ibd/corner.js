const ajax = require('./admin-ajax');

module.exports = async (ctx) => {
    await ajax.items(
        ctx,
        'https://www.investors.com/wp-admin/admin-ajax.php?id=&post_id=501&slug=investors-corner&canonical_url=https://www.investors.com/category/how-to-invest/investors-corner/&posts_per_page=6&page=0&offset=0&post_type=post&repeater=default&seo_start_page=1&preloaded=false&preloaded_amount=0&category=investors-corner&order=DESC&orderby=date&action=alm_get_posts&query_type=standard',
        'https://www.investors.com/category/research/swing-trading/',
        'IBD Investors Corner'
    );
};
