import { TAcademicSemester } from "../academicSemester/academicSemester.interface";
import { User } from "./user.model";

// find last student id
const findLastStudentId = async () => {
    const lastStudent = await User.findOne(
        {
            role: 'student'
        },
        {
            id: 1,
            _id: 0
        },
    )
        .sort({
            createdAt: -1
        })
        .lean()

    return lastStudent?.id ? lastStudent?.id.substring(6) : undefined;
};


// create student id
export const generateStudentId = async (payload: TAcademicSemester) => {
    const currentId = (await findLastStudentId()) || (0).toString();
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0'); // creating 4 digits according to serial
    incrementId = `${payload.year}${payload.code}${incrementId}`; // creating the full id
    return incrementId;
}