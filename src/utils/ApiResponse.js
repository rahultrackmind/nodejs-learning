export class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400; //for  response client related status codes
    }

    static sendResponse(res, statusCode = 500, message = "Something went wrong!", data = []) {
        return res.status(statusCode).json({
            data,
            message,
            success: true
        })
    }
}