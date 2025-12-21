import { ApiError } from "./ApiError.js";

export const generateAccessAndRefreshToken = async (req, res, user) => {
    try {
        const accessToken = await user.generateAccessToken();
        const refreshToken = await user.generateRefreshToken();
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });
        return { accessToken, refreshToken }
    } catch (error) {
        throw new ApiError.sendResponse(res, 500, "Error while generating access token or refresh token. Please try again!")
    }
}