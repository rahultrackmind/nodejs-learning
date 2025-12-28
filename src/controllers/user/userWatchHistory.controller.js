import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandlerPromise } from "../../utils/asyncHandler.js";

export const getWatchHistory = asyncHandlerPromise(async (req, res) => {
    try {
        const user = await User.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(req.user._id)
                }
            },
            {
                $lookup: {
                    from: 'videos',
                    localField: 'watchHistory',
                    foreignField: '_id',
                    as: 'watchHistory',
                    pipeline: [
                        {
                            $lookup: {
                                from: 'users',
                                localField: 'owner',
                                foreignField: '_id',
                                as: 'Owner',
                                pipeline: [
                                    {
                                        $project: {
                                            fullName: 1,
                                            username: 1,
                                            avatar: 1
                                        }
                                    }
                                ]
                            }
                        },
                        {
                            $addFields: {
                                owner: {
                                    $first: "$owner"
                                }
                            }
                        }

                    ]
                }
            }
        ]);
        if (!user) {
            throw ApiError.sendResponse(res, 404, "User not found!");
        }
        return ApiResponse.sendResponse(res, 200, "User watched fetched successfully!", user[0].watchHistory)
    } catch (error) {
        throw ApiError.sendResponse(res, 404, "No watch history found!");
    }
})