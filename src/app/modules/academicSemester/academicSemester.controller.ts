import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import { AcademicSemesterServices } from "./academicSemester.services";



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



export const AcademicSemesterController = {
    createAcademicSemester,
}