import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AcademicDepartmentServices } from "./academicDepartment.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";


// create academic faculty controller
const createAcademicDepartment = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicDepartmentServices.createAcademicDepartmentIntoDb(req.body);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic department is created successfully!",
        data: result
    })
})

// get all academic faculties controller
const getAllAcademicDepartments = catchAsync(async (req: Request, res: Response) => {
    const result = await AcademicDepartmentServices.getAllAcademicDepartmentsFromDb();

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic departments fetched successfully!",
        data: result
    })
})

// get single academic faculty controller
const getSingleAcademicDepartment = catchAsync(async (req: Request, res: Response) => {
    const { departmentId } = req.params;

    const result = await AcademicDepartmentServices.getSingleAcademicDepartmentFromDb(departmentId);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic department is fetched successfully!",
        data: result
    })
})


// update academy faculty controller
const updateAcademicDepartment = catchAsync(async (req: Request, res: Response) => {
    const { departmentId } = req.params;
    const result = await AcademicDepartmentServices.updateAcademyDepartmentIntoDb(departmentId, req.body);
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Academic department is updated successfully!",
        data: result
    })
})


export const AcademicDepartmentControllers = {
    createAcademicDepartment,
    getAllAcademicDepartments,
    getSingleAcademicDepartment,
    updateAcademicDepartment
}