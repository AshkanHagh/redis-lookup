import ErrorHandler from './errorHandler';

class RouteNowFoundError extends ErrorHandler {
    constructor(message : string) {
        super(message, 404);
    }
}

export { RouteNowFoundError };