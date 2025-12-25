import { ApiError } from "../../utils/ApiError.js";
import { asyncHandlerPromise } from "../../utils/asyncHandler.js";

export const getUserChannelProfile = asyncHandlerPromise(async (req, res) => {
    try {
        const { username } = req.params;
        if (!username?.trim()) {
            throw ApiError.sendResponse(res, 400, "Username is required!");
        }

    } catch (error) {
        throw ApiError.sendResponse(res, 400, 'Username is required!')
    }
})