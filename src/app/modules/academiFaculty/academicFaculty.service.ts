import { TAcademicFaculty } from './academicFaculty.interface';
import { AcademicFaculty } from './academicFaculty.model';

// create academic faculty
const createAcademicFacultyIntoDb = async (payload: TAcademicFaculty) => {
    const result = await AcademicFaculty.create(payload);
    return result;
}

// get all academic faculty
const getAllAcademicFacultiesFromDb = async () => {
    const result = await AcademicFaculty.find();
    return result;
}

// get single academic faculty
const getSingleAcademicFacultyFromDb = async (id: string) => {
    const result = await AcademicFaculty.findById(id);
    return result;
};

// update academy faculty
const updateAcademyFacultyIntoDb = async (id: string, payload: TAcademicFaculty) => {
    const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
}



export const AcademicFacultyServices = {
    createAcademicFacultyIntoDb,
    getAllAcademicFacultiesFromDb,
    getSingleAcademicFacultyFromDb,
    updateAcademyFacultyIntoDb
}