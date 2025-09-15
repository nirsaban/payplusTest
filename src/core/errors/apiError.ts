export class ApiError extends Error {
    public statusCode: number;

    constructor(message: string, statusCode = 500) {
        super(message);
        this.statusCode = statusCode;

        // restore prototype chain (important for instanceof checks in TS)
        Object.setPrototypeOf(this, new.target.prototype);
    }

    static badRequest(message = "Bad Request") {
        return new ApiError(message, 400);
    }

    static unauthorized(message = "Unauthorized") {
        return new ApiError(message, 401);
    }

    static forbidden(message = "Forbidden") {
        return new ApiError(message, 403);
    }

    static notFound(message = "Not Found") {
        return new ApiError(message, 404);
    }

    static internal(message = "Internal Server Error") {
        return new ApiError(message, 500);
    }
}
