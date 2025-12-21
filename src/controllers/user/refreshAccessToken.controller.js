import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandlerPromise } from "../../utils/asyncHandler.js";
import { generateAccessAndRefreshToken } from "../../utils/generateAccessAndRefreshToken.js"
import jwt from "jsonwebtoken";
export const refreshAccessToken = asyncHandlerPromise(async (req, res) => {

    try {
        const incomingRefreshToken = req.query?.token;
        if (!incomingRefreshToken) {
            return ApiError.sendResponse(res, 401, "Unauthorized Access!");
        }
        const decodedToken = jwt.verify(incomingRefreshToken, process.env.REFRESH_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id);
        if (!user) {
            return ApiError.sendResponse(res, 401, "Unauthorized Access!");
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            return ApiError.sendResponse(res, 401, "Refresh Token is expired or used!");
        }
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(req, res, user);
        const cookies = [
            {
                key: "accessToken",
                value: accessToken
            },
            {
                key: "refreshToken",
                value: refreshToken
            }
        ]
        return ApiResponse.sendResponseWithCookie(res, 200, cookies, null, "Access token refreshed!")
    } catch (error) {
        return ApiError.sendResponse(res, 401, "Unauthorized Access!")
    }

})