import { Request, Response } from 'express';
import catchAsync from '../../utils/catchAsync';
import { CourseServices } from './course.service';
import sendResponse from '../../utils/sendResponse';
import httpStatus from 'http-status';

// create course controller
const createCourse = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.createCourseIntoDb(req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is created successfully',
    data: result,
  });
});

// get all course controller
const getAllCourses = catchAsync(async (req: Request, res: Response) => {
  const result = await CourseServices.getAllCoursesFromDb(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course are retrieved successfully',
    data: result,
  });
});


// get single course controller
const getSingleCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseServices.getSingleCourseFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is retrieved successfully',
    data: result,
  });
});


// update course controller
const updateCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseServices.updateCourseIntoDB(id, req.body);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'course is updated successfully',
    data: result,
  });
});


// delete course controller
const deleteCourse = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await CourseServices.deleteCourseFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Course is deleted successfully',
    data: result,
  });
});


// assign faculties with course
const assignFacultiesWithCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseServices.assignFacultiesWithCourseIntoDB(
    courseId,
    faculties,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties assigned  successfully',
    data: result,
  });
});


// remove faculties from course
const removeFacultiesFromCourse = catchAsync(async (req: Request, res: Response) => {
  const { courseId } = req.params;
  const { faculties } = req.body;

  const result = await CourseServices.removeFacultiesFromCourseFromDB(
    courseId,
    faculties,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculties removed  successfully',
    data: result,
  });
});

export const CourseControllers = {
  createCourse,
  getSingleCourse,
  getAllCourses,
  updateCourse,
  deleteCourse,
  assignFacultiesWithCourse,
  removeFacultiesFromCourse,
};