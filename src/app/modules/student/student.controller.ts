import { NextFunction, Request, Response } from "express";
// import studentValidationSchema from "./student.validation";
import studentValidationSchema from "./student.validation";
import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendRsponse";
import httpStatus from "http-status";



// get all students controller
const getAllStudents = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB();

        // now send the response to client side
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Student data got successfully!",
            data: result
        })
    } catch (error) {
        next(error)
    }
};

// get single student controller
const getSingleStudent = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.getSingleStudentFromDB(studentId);

        // now send the response to client side
        sendResponse(res, {
            statusCode: httpStatus.OK,
            success: true,
            message: "Single student data is received successfully!",
            data: result
        })
    } catch (error) {
        next(error)
    }
};

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
};