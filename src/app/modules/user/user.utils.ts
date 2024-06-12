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

    return lastStudent?.id ? lastStudent?.id : undefined;
};


// create student id
export const generateStudentId = async (payload: TAcademicSemester) => {
    let currentId = (0).toString(); // by default 0000

    const lastStudentId = await findLastStudentId();
    // last student id example: 2030 01 0001
    const lastSemesterCode = lastStudentId?.substring(4, 6); // 01
    const lastStudentYear = lastStudentId?.substring(0, 4) // 2030
    const currentSemesterCode = payload.code;
    const currentYear = payload.year;

    if (lastStudentId && lastSemesterCode === currentSemesterCode && lastStudentYear === currentYear) {
        currentId = lastStudentId.substring(6); // this will add with 0001
    }




    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0'); // creating 4 digits according to serial
    incrementId = `${payload.year}${payload.code}${incrementId}`; // creating the full id
    return incrementId;
}


// Faculty ID
export const findLastFacultyId = async () => {
    const lastFaculty = await User.findOne(
        {
            role: 'faculty',
        },
        {
            id: 1,
            _id: 0,
        },
    )
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastFaculty?.id ? lastFaculty.id.substring(2) : undefined;
};

export const generateFacultyId = async () => {
    let currentId = (0).toString();
    const lastFacultyId = await findLastFacultyId();

    if (lastFacultyId) {
        currentId = lastFacultyId.substring(2);
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

    incrementId = `F-${incrementId}`;

    return incrementId;
};

// Admin ID
export const findLastAdminId = async () => {
    const lastAdmin = await User.findOne(
        {
            role: 'admin',
        },
        {
            id: 1,
            _id: 0,
        },
    )
        .sort({
            createdAt: -1,
        })
        .lean();

    return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
};

export const generateAdminId = async () => {
    let currentId = (0).toString();
    const lastAdminId = await findLastAdminId();

    if (lastAdminId) {
        currentId = lastAdminId.substring(2);
    }

    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

    incrementId = `A-${incrementId}`;
    return incrementId;
};