const makeDbInstance = require('../main/factories/db');

const db = makeDbInstance();

module.exports = class PurchaseOrdersRepository {
    async create(purchaseOrders) {
        const sql = `
            INSERT INTO 
                purchase-orders (product_id, price) 
            VALUES 
                (?,?);
        `;

        return db.persistMany(sql, purchaseOrders);
    }
};
