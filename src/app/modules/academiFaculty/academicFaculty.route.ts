import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AcademicFacultyValidation } from './academicFaculty.validation';
import { AcademicFacultyControllers } from './academicFaculty.controller';
const router = express.Router();


// create route
router.post("/create-academic-faculty",
    validateRequest(AcademicFacultyValidation.academicFacultyValidationSchema),
    AcademicFacultyControllers.createAcademyFaculty
)

// get all academic semester
router.get("/", AcademicFacultyControllers.getAllAcademicFaculties);

// get single academic faculty
router.get("/:facultyId", AcademicFacultyControllers.getSingleAcademyFaculty)

// update single academic faculty
router.patch("/:facultyId",
    validateRequest(AcademicFacultyValidation.updateAcademicFacultyValidationSchema),
    AcademicFacultyControllers.updateAcademyFaculty
)


export const AcademicFacultyRouter = router;