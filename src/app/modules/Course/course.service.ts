import httpStatus from "http-status";
import QueryBuilder from "../../builder/QueryBuilder";
import AppError from "../../errors/AppError";
import { CourseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";
import mongoose from "mongoose";


// create new course
const createCourseIntoDb = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
}


// get all courses from db
const getAllCoursesFromDb = async (query: Record<string, unknown>) => {

    const courseQuery = new QueryBuilder(
        Course.find(),
        // .populate(),
        query
    )
        .search(CourseSearchableFields)
        .filter()
        .sort()
        .paginate()
        .fields()

    const result = await courseQuery.modelQuery;
    return result;
}


// get single course from db
const getSingleCourseFromDb = async (id: string) => {
    const result = await Course.findById(id);
    return result;
}


// update course into db
const updateCourseIntoDB = async (id: string, payload: Partial<TCourse>) => {
    const { preRequisiteCourses, ...courseRemainingData } = payload;
  
    const session = await mongoose.startSession();
  
    try {
      session.startTransaction();
      //step1: basic course info update
      const updatedBasicCourseInfo = await Course.findByIdAndUpdate(
        id,
        courseRemainingData,
        {
          new: true,
          runValidators: true,
          session,
        },
      );
  
      if (!updatedBasicCourseInfo) {
        throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
      }
  
      // check if there is any pre requisite courses to update
      if (preRequisiteCourses && preRequisiteCourses.length > 0) {
        // filter out the deleted fields
        const deletedPreRequisites = preRequisiteCourses
          .filter((el) => el.course && el.isDeleted)
          .map((el) => el.course);
  
        const deletedPreRequisiteCourses = await Course.findByIdAndUpdate(
          id,
          {
            $pull: {
              preRequisiteCourses: { course: { $in: deletedPreRequisites } },
            },
          },
          {
            new: true,
            runValidators: true,
            session,
          },
        );
  
        if (!deletedPreRequisiteCourses) {
          throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
        }
  
        // filter out the new course fields
        const newPreRequisites = preRequisiteCourses?.filter(
          (el) => el.course && !el.isDeleted,
        );
  
        const newPreRequisiteCourses = await Course.findByIdAndUpdate(
          id,
          {
            $addToSet: { preRequisiteCourses: { $each: newPreRequisites } },
          },
          {
            new: true,
            runValidators: true,
            session,
          },
        );
  
        if (!newPreRequisiteCourses) {
          throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course!');
        }
      }
  
      await session.commitTransaction();
      await session.endSession();
  
      const result = await Course.findById(id).populate(
        'preRequisiteCourses.course',
      );
  
      return result;
    } catch (err) {
      await session.abortTransaction();
      await session.endSession();
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to update course');
    }
  };
  


// delete course from db
const deleteCourseFromDb = async (id: string) => {
    const result = await Course.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );
    return result;
}


export const CourseServices = {
    createCourseIntoDb,
    getAllCoursesFromDb,
    getSingleCourseFromDb,
    updateCourseIntoDB,
    deleteCourseFromDb
}