import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandlerPromise } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const authUser = asyncHandlerPromise(async (req, res, next) => {
    try {

        const token = req.cookies?.accessToken || req.header("Authorization").replace("Bearer", "");
        if (!token) {
            throw ApiError.sendResponse(res, 400, "Unauthorized access!");
        }
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");
        if (!user) {
            throw ApiError(res, 401, "Invalid Access Token!");
        }
        req.user = user;
        next();
    } catch (error) {
        throw ApiError.sendResponse(res, 401, "Unauthorized access!")
    }

})