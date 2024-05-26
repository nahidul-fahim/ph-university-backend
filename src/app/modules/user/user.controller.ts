// import httpStatus from 'http-status';

import { NextFunction, Request, Response } from 'express';
import { UserServices } from './user.service';
// import sendResponse from '../../utils/sendResponse';
// import { UserServices } from './user.service';

const createStudent = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const { password, student: studentData } = req.body;
        const result = await UserServices.createStudentIntoDb(password, studentData)

        // send the success data to client
        res.status(200).json({
            success: true,
            message: "Student created successfully!",
            data: result,
        })
    } catch (error: any) {
        res.status(400).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error,
        });
    }
};




export const UserControllers = {
    createStudent,
};