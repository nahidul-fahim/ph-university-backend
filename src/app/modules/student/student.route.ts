import express from "express";
import { StudentControllers } from "./student.controller";
// import { StudentControllers } from "./student.controller";

const router = express.Router();


// get all the students
router.get('/', StudentControllers.getAllStudents);


// get single student
router.get('/:studentId', StudentControllers.getSingleStudent);


// update student router
router.patch('/:studentId', StudentControllers.updateStudent);


// delete a student
router.delete('/:studentId', StudentControllers.deleteStudent);



export const StudentRoutes = router;