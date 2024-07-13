import ErrorHandler from './errorHandler';

class RouteNowFoundError extends ErrorHandler {
    constructor(message : string) {
        super(message, 404);
    }
}

class InvalidQueryError extends ErrorHandler {
    constructor(message = 'Invalid search query') {
        super(message, 400);
    }
}

export { RouteNowFoundError, InvalidQueryError };