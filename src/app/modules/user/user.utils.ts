import { TAcademicSemester } from "../academicSemester/academicSemester.interface";

// create student id
export const generateStudentId = (payload: TAcademicSemester) => {
    const currentId = (0).toString();
    let incrementId = (Number(currentId) + 1).toString().padStart(4, '0'); // creating 4 digits according to serial
    incrementId = `${payload.year}${payload.code}${incrementId}`; // creating the full id
    return incrementId;
}