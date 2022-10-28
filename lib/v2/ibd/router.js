module.exports = function (router) {
    router.get('/investors-corner', require('./admin-ajax').template);
    router.get('/stock-market-today', require('./admin-ajax').template);
    router.get('/research/swing-trading', require('./admin-ajax').template);
    router.get('/research/investing-action-plan', require('./admin-ajax').template);
    router.get('/research/stock-analysis', require('./admin-ajax').template);

    router.get('/research/stock-of-the-day', require('./admin-ajax').template);
    router.get('/stock-of-the-day', require('./admin-ajax').template);
    router.get('/screen-of-the-day', require('./admin-ajax').template);

    router.get('/stock-lists/stocks-near-a-buy-zone', require('./admin-ajax').template);
};
