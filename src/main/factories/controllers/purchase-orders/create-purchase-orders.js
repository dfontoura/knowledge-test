const PurchaseOrdersRepository = require('../../../../repositories/purchase-orders');
const CreatePurchaseOrderController = require('../../../../controllers/purchase-orders/create-purchase-order');
const makeCreatePurchaseOrderValidators = require('../../validators/purchase-order/create-purchase-order');

module.exports = () => {
    const repository = new PurchaseOrdersRepository();
    const validators = makeCreatePurchaseOrderValidators();

    return new CreatePurchaseOrderController(repository, validators);
};
