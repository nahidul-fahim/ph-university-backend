import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import { Request, Response } from 'express';


// create student user
const createStudent = catchAsync(async (req: Request, res: Response) => {
    const { password, student: studentData } = req.body;
    const result = await UserServices.createStudentIntoDb(password, studentData)

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: "Student created successfully!",
        data: result
    })
})


// create new faculty
const createFaculty = catchAsync(async (req: Request, res: Response) => {
    const { password, faculty: facultyData } = req.body;

    const result = await UserServices.createFacultyIntoDB(password, facultyData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Faculty is created successfully',
        data: result,
    });
});


//   create new admin
const createAdmin = catchAsync(async (req: Request, res: Response) => {
    const { password, admin: adminData } = req.body;

    const result = await UserServices.createAdminIntoDB(password, adminData);

    sendResponse(res, {
        statusCode: httpStatus.OK,
        success: true,
        message: 'Admin is created successfully',
        data: result,
    });
});




export const UserControllers = {
    createStudent,
    createFaculty,
    createAdmin
};