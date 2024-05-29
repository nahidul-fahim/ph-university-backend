import { Schema, model } from "mongoose";
import { TUser } from "./user.interface";
import bcrypt from 'bcrypt';
import config from "../../config";

// creating schema
const userSchema = new Schema<TUser>({
    id: {
        type: String,
        require: true,
        unique: true,
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
        default: 'in-progress'
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


// pre save middleware / pre save hook
userSchema.pre('save', async function (next) {
    const userData = this;
    // hashing password and save to database
    userData.password = await bcrypt.hash(userData.password, Number(config.bcrypt_salt),)
    next();
})


// set '' after saving password
userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
});


// creating model
export const User = model<TUser>('User', userSchema);