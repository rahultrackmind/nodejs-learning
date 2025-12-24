import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandlerPromise } from "../../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";

export const updateUserCoverImage = asyncHandlerPromise(async (req, res) => {
    try {
        const coverImageLocalPath = req.file?.path; //If multiple multer file then use file
        if (!coverImageLocalPath) {
            throw ApiError.sendResponse(res, 400, "Cover image is required!");
        }

        const coverImage = await uploadOnCloudinary(coverImageLocalPath);
        if (!coverImage.url) {
            return ApiError.sendResponse(res, 400, "Error while uploading on cover image!");
        }
        const user = await User.findByIdAndUpdate(req.user?._id,
            {
                $set: {
                    coverImage: coverImage.url
                }
            },
            { new: true }
        ).select("-password -refreshToken");
        if (!user) {
            return ApiError.sendResponse(res, 404, "User not found!");
        }
        return ApiResponse.sendResponse(res, 200, "Cover image updated successfully!", user)
    } catch (error) {
        return ApiError.sendResponse(res, 400, "Failed to update the cover image")
    }
}) 