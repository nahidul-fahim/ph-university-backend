import QueryBuilder from "../../builder/QueryBuilder";
import { CourseSearchableFields } from "./course.constant";
import { TCourse } from "./course.interface";
import { Course } from "./course.model";


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