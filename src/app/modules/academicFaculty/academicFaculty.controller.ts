import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AcademicFacultyServices } from "./academicFaculty.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";

// create academic faculty controller
const createAcademyFaculty = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicFacultyServices.createAcademicFacultyIntoDb(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Faculty is created successfully!",
        data: result
    })
})

// get all academic faculties controller
const getAllAcademicFaculties = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicFacultyServices.getAllAcademicFacultiesFromDb();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Faculties fetched successfully!",
        data: result
    })
})

// get single academic faculty controller
const getSingleAcademyFaculty = catchAsync(async (req: Request, res: Response) => {
    const { facultyId } = req.params;

    const result = await AcademicFacultyServices.getSingleAcademicFacultyFromDb(facultyId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Faculty is fetched successfully!",
        data: result
    })
})


// update academy faculty controller
const updateAcademyFaculty = catchAsync(async (req: Request, res: Response) => {
    const { facultyId } = req.params;
    const result = await AcademicFacultyServices.updateAcademyFacultyIntoDb(facultyId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Faculty is updated successfully!",
        data: result
    })
})


export const AcademicFacultyControllers = {
    createAcademyFaculty,
    getAllAcademicFaculties,
    getSingleAcademyFaculty,
    updateAcademyFaculty
}