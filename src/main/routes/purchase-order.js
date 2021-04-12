const { adaptRoute } = require('../adapters/express-router-adapter');
const makeFindAllPurchaseOrdersController = require('../factories/controllers/purchase-orders/find-all-purchase-orders');
const makeCreatePurchaseOrderController = require('../factories/controllers/purchase-orders/create-purchase-orders');

module.exports = (router) => {
    router.get('/purchase-orders', adaptRoute(makeFindAllPurchaseOrdersController()));
    router.post('/purchase-orders', adaptRoute(makeCreatePurchaseOrderController()));
};
