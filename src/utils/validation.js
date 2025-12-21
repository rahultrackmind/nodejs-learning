import { ApiError } from "./ApiError.js";

// experimental for now
export function emptyValidationCheck(fields) {
    if (!Array.isArray(fields) || !fields.length) return {
        isEmpty: true,
        errorMessage: 'Invalid type!'
    };
    let isEmpty = false;
    let errorMessage = [];
    console.log(fields)
    for (const key of fields) {
        if (key?.trim() === "") {
            isEmpty = true;
            errorMessage.push(`${key} is required!`);
            break;
        } else {
            isEmpty = false;
        }
    }
    return {
        isEmpty,
        errorMessage
    };
}

export function emptyPayloadValiationCheck(req, res, message = "Invalid Payload!") {
    if (!req.body || !Object.keys(req.body).length) {
        return ApiError.sendResponse(res, 400, message, null)
    }
}