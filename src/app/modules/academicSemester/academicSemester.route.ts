import express from 'express';
import { AcademicSemesterController } from './academicSemester.controller';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicSemesterValidation } from './academicSemester.validation';
const router = express.Router();


// create route
router.post("/create-academic-semester",
    validateRequest(AcademicSemesterValidation.createAcademicSemesterValidationSchema),
    AcademicSemesterController.createAcademicSemester)

// get all academic semester
router.get("/", AcademicSemesterController.getAllAcademicSemester);

// get single academic semester
router.get("/:semesterId", AcademicSemesterController.getSingleAcademicSemester)


export const AcademicSemesterRouter = router;