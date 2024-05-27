import { StudentServices } from "./student.service";
import sendResponse from "../../utils/sendResponse";
import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";


// get all students controller
const getAllStudents = catchAsync(async (req, res) => {
    const result = await StudentServices.getAllStudentsFromDB();
    // now send the response to client side
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student data got successfully!",
        data: result
    })
})

// get single student controller
const getSingleStudent = catchAsync(async (req, res, next) => {
    const { studentId } = req.params;
    const result = await StudentServices.getSingleStudentFromDB(studentId);
    // now send the response to client side
    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Single student data is received successfully!",
        data: result
    })
})

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
};