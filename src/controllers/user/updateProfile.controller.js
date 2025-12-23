import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandlerPromise } from "../../utils/asyncHandler.js";
import { emptyPayloadValiationCheck, validatePayloadKey, validateRequiredPayload } from "../../utils/validation.js";

export const updateProfile = asyncHandlerPromise(async (req, res) => {
    emptyPayloadValiationCheck(req, res);
    try {
        const { fullName, email } = req.body;
        validatePayloadKey(req, res, ["fullName", "email"]);
        validateRequiredPayload(res, [fullName, email])
        if (!fullName || !email) {
            return ApiError.sendResponse(res, 400, "Fields are required!")
        }

        const user = await User.findByIdAndUpdate(req.user?._id,
            {
                $set: {
                    fullName,
                    email
                }
            },
            { new: true }
        ).select("-password -refreshToken");
        if (!user) {
            return ApiError.sendResponse(res, 404, "User not found!");
        }
        return ApiResponse.sendResponse(res, 200, "Profile updated succesfully!", user)
    } catch (error) {
        return ApiError.sendResponse(res, 400, "Unauthorized access!")
    }


})