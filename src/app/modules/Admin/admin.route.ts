import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { updateAdminValidationSchema } from './admin.validation';
import { AdminControllers } from './admin.controller';

const router = express.Router();

// get all the admins route
router.get('/', AdminControllers.getAllAdmins);

// get a single admin route
router.get('/:id', AdminControllers.getSingleAdmin);

// update an admin
router.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

// delete an admin
router.delete('/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;