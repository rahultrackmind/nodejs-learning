import { User } from "../../models/user.model.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { asyncHandlerPromise } from "../../utils/asyncHandler.js";

export const getUserChannelProfile = asyncHandlerPromise(async (req, res) => {
    try {
        const { username } = req.params;
        if (!username?.trim()) {
            throw ApiError.sendResponse(res, 400, "Username is required!");
        }

        const channel = await User.aggregate([
            {
                $match: {
                    username: username?.toLowerCase()
                }
            },
            {
                $lookup: {
                    from: 'subscriptions',
                    foreignField: 'channel',
                    localField: '_id',
                    as: 'subscribers'

                },
                $lookup: {
                    from: 'subscriptions',
                    foreignField: 'subscriber',
                    localField: '_id',
                    as: 'subscribedTo'
                },
                $addFields: {
                    subcribersCount: {
                        $size: "$subscribers"
                    },
                    channelSubscribedToCount: {
                        $size: "$subscribedTo"
                    },
                    isSubscribed: {
                        $cond: {
                            if: { $in: [req.user?._id, "$subscribers.subscriber"] },
                            then: true,
                            else: false
                        }
                    }
                },
                $project: {
                    fullName: 1,
                    username: 1,
                    subcribersCount: 1,
                    channelSubscribedToCount: 1,
                    isSubscribed: 1,
                    avatar: 1,
                    coverImage: 1,
                    email: 1
                }
            }
        ]);
        console.log(channel);
        if (!channel?.length) {
            throw ApiError.sendResponse(res, 404, "Channel does not exist");
        }

        return ApiResponse.sendResponse(res, 200, "User channel fetched successfully!", channel[0])

    } catch (error) {
        throw ApiError.sendResponse(res, 404, 'No user found!')
    }
})