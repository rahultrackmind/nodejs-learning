import { User } from "../../models/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandlerPromise } from "../../utils/asyncHandler.js"

export const logoutUser = asyncHandlerPromise(async (req, res) => {
    await User.findByIdAndUpdate(req.user._id, {
        $set: {
            refreshToken: 1 //this remove the field from document
        }
    });

    const cookies = ["accessToken", "refreshToken"];
    return ApiResponse.sendResponseWithClearCookie(res, 200, cookies, null, "Logout Successfully!")
});