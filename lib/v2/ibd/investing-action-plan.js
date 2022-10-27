const ajax = require('./admin-ajax');

module.exports = async (ctx) => {
    await ajax.items(
        ctx,
        'https://www.investors.com/wp-admin/admin-ajax.php?id=&post_id=171447&slug=investing-action-plan&canonical_url=https://www.investors.com/category/research/investing-action-plan/&posts_per_page=6&page=0&offset=0&post_type=post&repeater=default&seo_start_page=1&preloaded=false&preloaded_amount=0&category=investing-action-plan&order=DESC&orderby=date&action=alm_get_posts&query_type=standard',
        'https://www.investors.com/category/research/investing-action-plan/',
        'IBD Investing Action Plan'
    );
};
