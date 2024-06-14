import { TCourse } from "./course.interface";
import { Course } from "./course.model";


// create new course
const createCourseIntoDb = async (payload: TCourse) => {
    const result = await Course.create(payload);
    return result;
}


// get all courses from db
const getAllCoursesFromDb = async () => {
    const result = await Course.find();
    return result;
}


// get single course from db
const getSingleCourseFromDb = async (id: string) => {
    const result = await Course.findById(id);
    return result;
}


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
    deleteCourseFromDb
}