const PurchaseOrdersRepository = require('../../src/repositories/purchase-orders');

jest.mock('../../src/main/factories/db', () => {
    return () => ({
        persistMany: () => mockCreatePurchaseOrderParams().length,
        select: () => []
    });
});

const mockCreatePurchaseOrderParams = () => ([[
    'valid_product_id',
    'valid_price',
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
});
