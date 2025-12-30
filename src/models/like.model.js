import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const likeSchema = Schema.create(
    {
        Video: {
            type: Schema.Types.ObjectId,
            ref: "Video",
        },
        comment: {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        },
        tweet: {
            type: Schema.Types.ObjectId,
            ref: "Tweet"
        },
        likeBy: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }

    },
    { timestamps: true }
)

likeSchema.plugin(mongooseAggregatePaginate)
export const Like = mongoose.model('Like', likeSchema);