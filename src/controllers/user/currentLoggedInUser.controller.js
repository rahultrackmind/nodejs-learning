import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandlerPromise } from "../../utils/asyncHandler.js";

export const getCurrentLoggedInUser = asyncHandlerPromise((req, res) => {
    const currentUser = req.user;
    if (!currentUser?._id) {
        throw ApiError.sendResponse(res, 500, "Internal Server Error")
    }
    return ApiResponse.sendResponse(res, 200, "Successfull!", currentUser);
})