import { TAcademicDepartment } from "./academicDepartment.interface";
import { AcademicDepartment } from "./academicDepartment.model";



// create academic faculty
const createAcademicDepartmentIntoDb = async (payload: TAcademicDepartment) => {
    const result = await AcademicDepartment.create(payload);
    return result;
}

// get all academic faculty
const getAllAcademicDepartmentsFromDb = async () => {
    const result = await AcademicDepartment.find();
    return result;
}

// get single academic faculty
const getSingleAcademicDepartmentFromDb = async (id: string) => {
    const result = await AcademicDepartment.findById(id);
    return result;
};

// update academy faculty
const updateAcademyDepartmentIntoDb = async (id: string, payload: TAcademicDepartment) => {
    const result = await AcademicDepartment.findOneAndUpdate({ _id: id }, payload, { new: true });
    return result;
}



export const AcademicDepartmentServices = {
    createAcademicDepartmentIntoDb,
    getAllAcademicDepartmentsFromDb,
    getSingleAcademicDepartmentFromDb,
    updateAcademyDepartmentIntoDb
}