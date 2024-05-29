import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AcademicSemesterServices } from "./academicSemester.services";


// create academic semester controller
const createAcademicSemester = catchAsync(async (req: Request, res: Response) => {
    // const { password, student: studentData } = req.body;
    const result = await AcademicSemesterServices.createAcademicSemesterIntoDb(req.body)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Semester is created successfully!",
        data: result
    })
})


// get all the academic semester controller
const getAllAcademicSemester = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicSemesterServices.getAllAcademicSemesterFromDb();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Semester fetched successfully!",
        data: result
    })
})

// get single academic semester from db
const getSingleAcademicSemester = catchAsync(async (req: Request, res: Response) => {
    const { semesterId } = req.params;
    const result = await AcademicSemesterServices.getSingleAcademicSemesterFromDb(semesterId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic Semester fetched successfully!",
        data: result
    })
})



export const AcademicSemesterController = {
    createAcademicSemester,
    getAllAcademicSemester,
    getSingleAcademicSemester
}