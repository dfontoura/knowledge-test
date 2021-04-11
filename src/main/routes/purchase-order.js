const { adaptRoute } = require('../adapters/express-router-adapter');
const makeCreatePurchaseOrderController = require('../factories/controllers/purchase-orders/create-purchase-orders');

module.exports = (router) => {
    router.post('/purchase-orders', adaptRoute(makeCreatePurchaseOrderController()));
};
