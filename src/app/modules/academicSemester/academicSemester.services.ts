import { academicSemesterNameCodeMapper } from "./academicSemester.constant";
import { TAcademicSemester } from "./academicSemester.interface";
import { AcademicSemester } from "./academicSemester.model";


const createAcademicSemesterIntoDb = async (payload: TAcademicSemester) => {

    // checking correct code for correct semester
    if (academicSemesterNameCodeMapper[payload.name] !== payload.code) {
        throw new Error("Invalid semester code")
    }

    const result = await AcademicSemester.create(payload);
    return result;
}


export const AcademicSemesterServices = {
    createAcademicSemesterIntoDb,
}