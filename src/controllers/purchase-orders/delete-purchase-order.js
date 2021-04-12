const { serverError, badRequest, deleted } = require('../../utils/http/http-helper');

module.exports = class DeletePurchaseOrderController {
    constructor(repository, validation) {
        this.repository = repository;
        this.validation = validation;
    }

    async handle(request) {
        try {
            const errors = this.validation.validate(request.route);
            if (errors.length > 0) {
                return badRequest(errors);
            }

            await this.repository.delete(request.route.id);
            return deleted(request.route);
        } catch (error) {
            return serverError(error);
        }
    }
};
