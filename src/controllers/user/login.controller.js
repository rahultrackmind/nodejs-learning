import { asyncHandlerPromise } from "../../utils/asyncHandler.js";
import { emptyPayloadValiationCheck } from "../../utils/validation.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js";
import { User } from "../../models/user.model.js";
import { generateAccessAndRefreshToken } from "../../utils/generateAccessAndRefreshToken.js"
export const loginUser = asyncHandlerPromise(async (req, res) => {
    //Is payload coming > not throw error
    //validate payload username or email
    //find user
    //check password
    //if all true then generate access token and refresh token
    //send tokens in cookies
    //send response 

    emptyPayloadValiationCheck(req, res);
    try {

        const { username, email, password } = req.body;
        if (!username && !email) {
            return ApiError.sendResponse(res, 400, "username or email is required!");
        }
        const user = await User.findOne({
            $or: [{ username }, { email }]
        });
        if (!user) {
            return ApiError.sendResponse(res, 404, "User does not exist!");
        }

        const isPasswordCorrect = await user.isPasswordCorrect(password);
        if (!isPasswordCorrect) {
            return ApiError.sendResponse(res, 401, "Invalid user credentails!")
        }
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(req, res, user);
        const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

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
        const userData = {
            user: loggedInUser,
            accessToken,
            refreshToken
        }
        return ApiResponse.sendResponseWithCookie(res, 200, cookies, userData, "User logged In Successfully!");

    } catch (error) {
        return ApiError.sendResponse(res, 401, "Invalid user credentails!")
    }

});

