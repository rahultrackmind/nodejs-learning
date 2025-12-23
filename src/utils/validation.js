import { ApiError } from "./ApiError.js";

export function emptyPayloadValiationCheck(req, res, message = "Invalid Payload!") {
    if (!req.body || !Object.keys(req.body).length) {
        throw ApiError.sendResponse(res, 400, message, null)
    }
}
export function validateRequiredPayload(res, fields = [], message = "All fields are required!") {
    if (!fields.length) {
        throw ApiError.sendResponse(res, 400, message)
    }
    const hasEmptyField = fields.some(field => field?.trim() === "");
    if (hasEmptyField) {
        throw ApiError.sendResponse(res, 400, "All fields are required!");
    }
    return true;
}


export function validatePayloadKey(req, res, fields = [], message = "Invalid key name") {
    if (!req.body || !Object.keys(req.body).length) {
        throw ApiError.sendResponse(res, 400, message, null)
    }

    if (!fields.length) {
        throw ApiError.sendResponse(res, 400, message)
    }
    const incomingKeys = Object.keys(req.body);
    if (fields.length !== incomingKeys.length) {
        return ApiError.sendResponse(res, 400, "All fields are required!")
    }
    const sortedArr1 = [...incomingKeys].sort();
    const sortedArr2 = [...fields].sort();

    const hasSameFields = sortedArr1.every((item, index) => {
        return item === sortedArr2[index];
    });
    if (!hasSameFields) {
        throw ApiError.sendResponse(res, 400, message)
    }
    return true;
}