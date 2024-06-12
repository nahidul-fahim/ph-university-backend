import express from "express";
import { UserControllers } from "./user.controller";
import { createStudentValidationSchema } from "../student/student.validation";
import validateRequest from "../../middlewares/validateRequest";
import { createFacultyValidationSchema } from "../Faculty/faculty.validation";
import { createAdminValidationSchema } from "../Admin/admin.validation";

const router = express.Router();

// create student route
router.post(
    "/create-student",
    validateRequest(createStudentValidationSchema),
    UserControllers.createStudent
)

// create faculty route
router.post(
    '/create-faculty',
    validateRequest(createFacultyValidationSchema),
    UserControllers.createFaculty,
);

// create admin route
router.post(
    '/create-admin',
    validateRequest(createAdminValidationSchema),
    UserControllers.createAdmin,
);


export const UserRoutes = router;