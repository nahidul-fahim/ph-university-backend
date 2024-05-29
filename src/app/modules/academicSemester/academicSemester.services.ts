import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";

// create new semester
const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {
    // checking correct code for correct semester
    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error("Invalid semester code")
    }
    const result = await AcademicSemester.create(payload);
    return result;
}

// get all the academic semester
const getAllAcademicSemesterFromDb = async () => {
    const result = await AcademicSemester.find();
    return result;
}


// get single academic semester
const getSingleAcademicSemesterFromDb = async (id: string) => {
    const result = await AcademicSemester.findById(id);
    return result;
}





export const AcademicSemesterServices = {
    createAcademicSemesterIntoDb,
    getAllAcademicSemesterFromDb,
    getSingleAcademicSemesterFromDb,
}