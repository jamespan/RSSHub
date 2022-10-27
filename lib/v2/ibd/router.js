module.exports = function (router) {
    router.get('/investors-corner', require('./corner'));
    router.get('/stock-market-today', require('./today'));
    router.get('/research/swing-trading', require('./swing-trading'));
    router.get('/research/investing-action-plan', require('./investing-action-plan'));
    router.get('/stock-of-the-day', require('./stock-of-the-day'));
};
