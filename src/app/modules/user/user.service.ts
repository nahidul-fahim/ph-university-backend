import httpStatus from "http-status";
import config from "../../config";
import AppError from "../../errors/AppError";
import { AcademicSemester } from "../academicSemester/academicSemester.model";
import { TStudent } from "../student/student.interface";
import { Student } from "../student/student.model";
import { TUser } from "./user.interface";
import { User } from "./user.model";
import { generateStudentId } from "./user.utils";


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
    // set auto generated id
    userData.id = await generateStudentId(admissionSemester);

    // create a user
    const newUser = await User.create(userData);
    // create a student
    if (Object.keys(newUser).length) {
        // set id, _id as user
        payload.id = newUser.id; // embedding id
        payload.user = newUser._id // reference id
        const newStudent = await Student.create(payload)
        return newStudent;
    }
}


export const UserServices = {
    createStudentIntoDb,
}