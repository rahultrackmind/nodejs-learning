export class ApiError extends Error {
    constructor(statusCode, message = "Something went wrong", errors = [], stacks = []) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;

        if (stacks) {
            this.stack = stacks
        } else {
            Error.captureStackTrace(this, this.contructor)
        }
    }


    static sendResponse(res, statusCode, message = "Something went wrong", errors = [], stacks = []) {
        return res.status(statusCode).json({
            data: null,
            message,
            success: false
        })
    }
}
