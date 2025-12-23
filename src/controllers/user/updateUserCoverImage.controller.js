import { ApiError } from "../../utils/ApiError";
import { asyncHandlerPromise } from "../../utils/asyncHandler";

export const updateUserCoverImage = asyncHandlerPromise(async (req, res) => {
    try {

    } catch (error) {
        return ApiError.sendResponse(res, 400, "Failed to update the cover image")
    }
}) 