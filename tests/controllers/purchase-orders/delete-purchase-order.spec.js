const faker = require('faker');

const DeletePurchaseOrderController = require('../../../src/controllers/purchase-orders/delete-purchase-order');
const ServerError = require('../../../src/utils/errors/server');
const MissingParamError = require('../../../src/utils/errors/missing-param');
const { badRequest, serverError, deleted } = require('../../../src/utils/http/http-helper');
const ValidationSpy = require('../mocks/mock-validation');
const PurchaseOrderRepositorySpy = require('../mocks/mock-purchase-order-repository');

const mockPurchaseOrder = () => ({
    id: 'valid_id',
});

const mockRequest = () => {
    return {
        route: mockPurchaseOrder(),
    };
};

const makeSut = () => {
    const validationSpy = new ValidationSpy();
    const purchaseOrderRepositorySpy = new PurchaseOrderRepositorySpy();
    const sut = new DeletePurchaseOrderController(purchaseOrderRepositorySpy, validationSpy);
    return {
        sut,
        validationSpy,
        purchaseOrderRepositorySpy,
    };
};

describe('DeletePurchaseOrder Controller', () => {
    it('should return 500 if PurchaseOrderRepository delete() throws', async () => {
        const { sut, purchaseOrderRepositorySpy } = makeSut();
        jest.spyOn(purchaseOrderRepositorySpy, 'delete').mockImplementationOnce(() => {
            throw new Error();
        });
        const httpResponse = await sut.handle(mockRequest());
        expect(httpResponse).toEqual(serverError(new ServerError(null)));
    });

    it('should call PurchaseOrderRepository delete() with correct values', async () => {
        const { sut, purchaseOrderRepositorySpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(purchaseOrderRepositorySpy.params).toEqual(request.route.id);
    });

    it('should call Validation with correct value', async () => {
        const { sut, validationSpy } = makeSut();
        const request = mockRequest();
        await sut.handle(request);
        expect(validationSpy.input).toEqual(request.route);
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

    it('should return 200 if valid data is provided', async () => {
        const { sut } = makeSut();
        const request = mockRequest();
        const httpResponse = await sut.handle(request);
        expect(httpResponse).toEqual(deleted(request.route));
    });
});
