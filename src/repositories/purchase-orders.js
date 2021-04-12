const makeDbInstance = require('../main/factories/db');

const db = makeDbInstance();

module.exports = class PurchaseOrdersRepository {
    async findAll() {
        const sql = `
            SELECT
                purchase_orders.id,
                purchase_orders.product_id,
                products.description,
                products.supplier_id,
                suppliers.name,
                suppliers.country,
                purchase_orders.price
            FROM
                purchase_orders, products, suppliers
            WHERE
                purchase_orders.deletion_flag = 'f' AND
                purchase_orders.product_id = products.id AND
                products.supplier_id = suppliers.id             
        `;
        const purchaseOrders = await db.select(sql);

        return purchaseOrders;
    }

    async create(purchaseOrders) {
        const sql = `
            INSERT INTO 
                purchase_orders (product_id, price) 
            VALUES 
                (?,?);
        `;

        return db.persistMany(sql, purchaseOrders);
    }

    async delete(id) {
        const sql = `
            UPDATE 
                purchase_orders
            SET 
                deletion_flag = 't' 
            WHERE 
                id = ?;
        `;

        return db.update(sql, id);
    }
};
