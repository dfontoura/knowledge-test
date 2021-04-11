const faker = require('faker');

const CreatePurchaseOrderController = require('../../../src/controllers/purchase-orders/create-purchase-order');
const ServerError = require('../../../src/utils/errors/server');
const MissingParamError = require('../../../src/utils/errors/missing-param');
const { badRequest, serverError, created } = require('../../../src/utils/http/http-helper');
const ValidationSpy = require('../mocks/mock-validation');
const PurchaseOrderRepositorySpy = require('../mocks/mock-purchase-order-repository');

const mockPurchaseOrder = () => ({
    product_id: 'valid_product_id',
    price: 'valid_price',
});

const mockRequest = () => {
    return {
        body: mockPurchaseOrder(),
    };
};

const mockArrayRequest = () => {
    return {
        body: [
            mockPurchaseOrder(),
            mockPurchaseOrder(),
        ]
    };
};

const makeSut = () => {
    const validationSpy = new ValidationSpy();
    const purchaseOrderRepositorySpy = new PurchaseOrderRepositorySpy();
    const sut = new CreatePurchaseOrderController(purchaseOrderRepositorySpy, validationSpy);
    return {
        sut,
        validationSpy,
        purchaseOrderRepositorySpy,
    };
};

describe('CreatePurchaseOrder Controller', () => {
    it('should return 500 if PurchaseOrderRepository create() throws', async () => {
        const { sut, purchaseOrderRepositorySpy } = makeSut();
        jest.spyOn(purchaseOrderRepositorySpy, 'create').mockImplementationOnce(() => {
            throw new Error();
        });
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new ServerError(null)));
    });

    it('should call PurchaseOrderRepository create() with correct values', async () => {
        const { sut, purchaseOrderRepositorySpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(purchaseOrderRepositorySpy.params).toEqual(sut.serializePurchaseOrdersToDb(request.body));
    });

    it('should call Validation with correct value', async () => {
        const { sut, validationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(validationSpy.input).toEqual(request.body);
    });

    it('should return 400 if Validation returns an error', async () => {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = [new MissingParamError(faker.random.word())];
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(badRequest(validationSpy.error));
    });

    it('should return 400 if Validation returns an error array', async () => {
        const { sut, validationSpy } = makeSut();
        validationSpy.error = [new MissingParamError(faker.random.word())];
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(badRequest(validationSpy.error));
    });

    it('should return 200 if valid array data is provided', async () => {
        const { sut } = makeSut();
        const request = mockArrayRequest();
        const httpResponse = await sut.handle(request);
        expect(httpResponse).toEqual(created(request.body));
    });

    it('should return 200 if valid data is provided', async () => {
        const { sut } = makeSut();
        const request = mockRequest();
        const httpResponse = await sut.handle(request);
        expect(httpResponse).toEqual(created(request.body));
    });
});
