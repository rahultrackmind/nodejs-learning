import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandlerPromise } from "../../utils/asyncHandler.js";
import { emptyPayloadValiationCheck, validateRequiredPayload, validatePayloadKey } from "../../utils/validation.js";

export const resetPassword = asyncHandlerPromise(async (req, res) => {
    emptyPayloadValiationCheck(req, res);
    try {
        const { oldPassword, newPassword } = req.body;
        validatePayloadKey(req, res, ["oldPassword", "newPassword"]);
        validateRequiredPayload(res, [oldPassword, newPassword]);
        const user = await User.findById(req.user?._id);
        const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

        if (!isPasswordCorrect) {
            throw ApiError.sendResponse(res, 400, "Invalid old password!")
        }
        user.password = newPassword;
        await user.save({ validateBeforeSave: false });
        return ApiResponse.sendResponse(res, 200, "Password reset successfully!")
    } catch (error) {
        return ApiError.sendResponse(res, 400, error?.message || 'Failed to reset the password!')
    }

})