import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";
import mongoose from "mongoose";


const createStudentIntoDb = async (password: string, payload: TStudent) => {
    // create a user object
    let userData: Partial<TUser> = {};
    // if password is not given, use default password
    userData.password = password || config.default_password as string;
    // set student role
    userData.role = 'student'
    // find academic semester info
    const admissionSemester = await AcademicSemester.findById(payload.admissionSemester);
    if (!admissionSemester) {
        throw new AppError(httpStatus.NOT_FOUND, "Semester not found!")
    }
    
    /*
    Steps of transaction and rollback: 
    1. startSession()
    2. startTransaction()
    3. If transaction is successful: commitTransaction() || Otherwise: abortTransaction()
    4. endSession()
    */

    const session = await mongoose.startSession();

    try {
        session.startTransaction();
        // set auto generated id
        userData.id = await generateStudentId(admissionSemester);

        // create a user
        const newUser = await User.create([userData], { session });
        // create a student
        if (!newUser.length) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to create user!")
        }
        // set id, _id as user
        payload.id = newUser[0].id; // embedding id
        payload.user = newUser[0]._id // reference id

        // create new student into database
        const newStudent = await Student.create([payload], { session })

        if (!newStudent.length) {
            throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student!")
        }

        await session.commitTransaction()
        await session.endSession()
        return newStudent;
    }
    catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new AppError(httpStatus.BAD_REQUEST, "Failed to create student!")
    }

}


export const UserServices = {
    createStudentIntoDb,
}