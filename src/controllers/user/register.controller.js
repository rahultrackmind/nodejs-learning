import { asyncHandlerPromise } from "../../utils/asyncHandler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from '../../utils/ApiResponse.js';
import { User } from "../../models/user.model.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js";
import { emptyPayloadValiationCheck } from "../../utils/validation.js";
export const registerUser = asyncHandlerPromise(async (req, res) => {
    // get user detail from frontend
    // validation
    // check if user already exist: with username or email
    // check for images , check for avatar
    // If images available upload to cloudinary, avatar
    // create user object - create entry in DB
    // Send  response to frontend - Remove refresh token and password from object.
    // check for user creation
    // if user created return else send error

    emptyPayloadValiationCheck(req, res);
    const { fullName, username, email, password } = req.body;
    const hasEmptyField = [fullName, username, email, password].some((field) => field?.trim() === "");
    if (hasEmptyField) {
        throw ApiError.sendResponse(res, 400, "All fields are required!");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    });

    if (existedUser) {
        throw ApiError.sendResponse(res, 409, "User already exist!")
    }
    const avatarLocalPath = req.files?.avatar?.[0]?.path;
    const coverImageLocalPath = req.files?.coverImage?.[0]?.path;
    if (!avatarLocalPath) {
        throw ApiError.sendResponse(res, 400, "Avatar is required!");
    }
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw ApiError.sendResponse(res, 400, "Failed to upload the avatar. Please try again!");
    }
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username?.toLowerCase()
    });
    console.log(user)
    const isUserCreated = await User.findById(user._id).select("-password -refreshToken");
    if (!isUserCreated) {
        throw ApiError(res, 500, "Something went wrong. Failed to register the User. Please try again!")
    }

    ApiResponse.sendResponse(res, 201, 'User created successfully!', user);
})