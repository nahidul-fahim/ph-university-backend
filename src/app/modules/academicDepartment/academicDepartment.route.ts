import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicDepartmentValidation } from './academicDepartment.validation';
import { AcademicDepartmentControllers } from './academicDepartment.controller';
const router = express.Router();


// create route
router.post("/create-academic-department",
    validateRequest(AcademicDepartmentValidation.createAcademicDepartmentValidationSchema),
    AcademicDepartmentControllers.createAcademicDepartment
)

// get all academic department
router.get("/", AcademicDepartmentControllers.getAllAcademicDepartments);

// get single academic department
router.get("/:departmentId", AcademicDepartmentControllers.getSingleAcademicDepartment)

// update single academic department
router.patch("/:departmentId",
    validateRequest(AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema),
    AcademicDepartmentControllers.updateAcademicDepartment
)


export const AcademicDepartmentRouter = router;