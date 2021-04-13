const PurchaseOrdersRepository = require('../../src/repositories/purchase-orders');

jest.mock('../../src/main/factories/db', () => {
    return () => ({
        persistMany: () => mockCreatePurchaseOrderParams().length,
        update: () => mockDeletePurchaseOrderParams().length,
        select: () => []
    });
});

const mockCreatePurchaseOrderParams = () => ([[
    'valid_product_id',
    'valid_price',
]]);

const mockDeletePurchaseOrderParams = () => ([[
    'valid_id',
]]);

const makeSut = () => {
    return new PurchaseOrdersRepository();
};

describe('PurchaseOrdersRepository', () => {
    describe('create()', () => {
        it('should return inserted rows length on success', async () => {
            const sut = makeSut();
            const params = mockCreatePurchaseOrderParams();
            const insertedRows = await sut.create(params);
            expect(insertedRows).toBe(1);
        });
    });

    describe('findAll()', () => {
        it('should return purchase orders list', async () => {
            const sut = makeSut();
            const purchaseOrders = await sut.findAll();
            expect(purchaseOrders).toEqual([]);
        });
    });

    describe('delete()', () => {
        it('should return affected rows on success', async () => {
            const sut = makeSut();
            const params = mockDeletePurchaseOrderParams();
            const deletedId = await sut.delete(params);
            expect(deletedId).toBe(1);
        });
    });
});
