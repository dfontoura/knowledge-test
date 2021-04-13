const { adaptRoute } = require('../adapters/express-router-adapter');
const makeFindAllPurchaseOrdersController = require('../factories/controllers/purchase-orders/find-all-purchase-orders');
const makeCreatePurchaseOrderController = require('../factories/controllers/purchase-orders/create-purchase-orders');
const makeDeletePurchaseOrderController = require('../factories/controllers/purchase-orders/delete-purchase-order');

module.exports = (router) => {
    router.get('/orders', adaptRoute(makeFindAllPurchaseOrdersController()));
    router.post('/orders', adaptRoute(makeCreatePurchaseOrderController()));
    router.delete('/orders/:id', adaptRoute(makeDeletePurchaseOrderController()));
};
