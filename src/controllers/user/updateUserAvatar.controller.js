import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandlerPromise } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
export const updateUserAvatar = asyncHandlerPromise(async (req, res) => {
    try {

        const avatarLocalPath = req.file?.path; //If multiple multer file then use file
        if (!avatarLocalPath) {
            throw ApiError.sendResponse(res, 400, "Avatar is required!");
        }

        const avatar = await uploadOnCloudinary(avatarLocalPath);
        if (!avatar.url) {
            return ApiError.sendResponse(res, 400, "Error while uploading on avatar!");
        }
        const user = await User.findByIdAndUpdate(req.user?._id,
            {
                $set: {
                    avatar: avatar.url
                }
            },
            { new: true }
        ).select("-password -refreshToken");
        if (!user) {
            return ApiError.sendResponse(res, 404, "User not found!");
        }
        return ApiResponse.sendResponse(res, 200, "Avatar updated successfully!", user)
    } catch (error) {
        return ApiError.sendResponse(res, 400, "Unauthorized access!")
    }

})