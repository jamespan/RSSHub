module.exports = function (router) {
    router.get('/investors-corner', require('./corner'));
    router.get('/stock-market-today', require('./today'));
    router.get('/research/swing-trading', require('./swing-trading'));
    router.get('/research/investing-action-plan', require('./investing-action-plan'));
    router.get('/research/stock-analysis', require('./stock-analysis'));
    router.get('/stock-of-the-day', require('./stock-of-the-day'));
    router.get('/stock-lists/stocks-near-a-buy-zone', require('./stocks-near-a-buy-zone'));
};
