import { Request, Response } from "express";
// import studentValidationSchema from "./student.validation";
import studentValidationSchema from "./student.validation";
import { StudentServices } from "./student.service";



// get all students controller
const getAllStudents = async (req: Request, res: Response) => {
    try {
        const result = await StudentServices.getAllStudentsFromDB();
        // now send the response to client side
        res.status(200).json({
            success: true,
            message: "Student data got successfully!",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error,
        });
    }
};

// get single student controller
const getSingleStudent = async (req: Request, res: Response) => {
    try {
        const { studentId } = req.params;
        const result = await StudentServices.getSingleStudentFromDB(studentId);
        // now send the response to client side
        res.status(200).json({
            success: true,
            message: "Single student data is received successfully!",
            data: result,
        });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message || "Something went wrong",
            error: error,
        });
    }
};

export const StudentControllers = {
    getAllStudents,
    getSingleStudent,
};