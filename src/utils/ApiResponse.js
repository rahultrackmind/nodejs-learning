export class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400; //for  response client related status codes
    }

    static sendResponse(res, statusCode = 200, message = "Successfull!", data = []) {
        return res.status(statusCode).json({
            data,
            message,
            success: true
        })
    }

    static sendResponseWithCookie(res, statusCode = 200, cookies = [], data = [], message = "Successfull!") {
        if (!cookies.length) return;
        const cookieOptions = {
            httpOnly: true, // cookies only modified from server side not from frontend
            secure: true
        }
        let response = res.status(statusCode);
        cookies.forEach(cookie => {
            response = response.cookie(cookie.key, cookie.value, cookieOptions);
        });

        return response.json({
            data,
            message,
            success: true
        })

    }

    static sendResponseWithClearCookie(res, statusCode = 200, cookies = [], data = [], message = "Successfull!") {
        if (!cookies.length) return;
        const cookieOptions = {
            httpOnly: true, // cookies only modified from server side not from frontend
            secure: true
        }
        let response = res.status(statusCode);
        cookies.forEach(cookie => {
            response = response.clearCookie(cookie, cookieOptions)
        });

        return response.json({
            data,
            message,
            success: true
        })
    }
}