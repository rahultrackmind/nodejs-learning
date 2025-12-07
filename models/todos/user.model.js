import mongoose from 'mongoose';
const userSchema = new mongoose.Schema(
    {
        usrename: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },
        password: {
            type: String,
            required: [true, "Passowrd is required"], // custom error message handling
        }
    },
    {
        timestamps: true
    }
);

export const User = mongoose.model('User', userSchema)