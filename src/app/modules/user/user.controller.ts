import { NextFunction, Request, RequestHandler, Response } from 'express';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';


// higher order function to handle async request and catch error
const catchAsync = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(err => next(err));
    }
}

// create student user
const createStudent = catchAsync(async (req, res, next,) => {
    const { password, student: studentData } = req.body;
    const result = await UserServices.createStudentIntoDb(password, studentData)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student created successfully!",
        data: result
    })
})




export const UserControllers = {
    createStudent,
};