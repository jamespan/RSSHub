module.exports = function (router) {
    router.get('/investors-corner', require('./corner'));
    router.get('/stock-market-today', require('./today'));
    router.get('/research/swing-trading', require('./swing-trading'));
};
