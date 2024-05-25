import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";

// creating schema
const userSchema = new Schema<TUser>({
    id: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    needsPasswordChange: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        enum: ['admin', 'student', 'faculty'],
    },
    status: {
        type: String,
        enum: ['in-progress', 'blocked'],
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
},
    {
        timestamps: true
    }
)


// creating model
export const User = model<TUser>('User', userSchema);