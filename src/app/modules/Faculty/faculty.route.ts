import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { updateFacultyValidationSchema } from './faculty.validation';
import { FacultyControllers } from './faculty.controller';

const router = express.Router();

// get a single faculty
router.get('/:id', FacultyControllers.getSingleFaculty);

// update faculty
router.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

// delete a faculty
router.delete('/:id', FacultyControllers.deleteFaculty);

// get all the faculties
router.get('/', FacultyControllers.getAllFaculties);

export const FacultyRoutes = router;