import { Router } from "express";
import { UserRoutes } from "../modules/user/user.router";
import { StudentRoutes } from "../modules/student/student.route";
import { AcademicSemesterRouter } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRouter } from "../modules/academicFaculty/academicFaculty.route";
import { AcademicDepartmentRouter } from "../modules/academicDepartment/academicDepartment.route";
import { FacultyRoutes } from "../modules/Faculty/faculty.route";
import { AdminRoutes } from "../modules/Admin/admin.route";
import { CourseRoutes } from "../modules/Course/course.route";
import { semesterRegistrationRoutes } from "../modules/semesterRegistration/semesterRegistration.route";
import { offeredCourseRoutes } from "../modules/offeredCourse/offeredCourse.route";
import { AuthRoutes } from "../modules/Auth/auth.route";

const router = Router();

// all routes
const moduleRoutes = [
    {
        path: '/users',
        route: UserRoutes
    },
    {
        path: '/students',
        route: StudentRoutes
    },
    {
        path: '/faculties',
        route: FacultyRoutes,
    },
    {
        path: '/admins',
        route: AdminRoutes,
    },
    {
        path: '/courses',
        route: CourseRoutes,
    },
    {
        path: '/academic-semesters',
        route: AcademicSemesterRouter,
    },
    {
        path: '/academic-faculty',
        route: AcademicFacultyRouter,
    },
    {
        path: '/academic-department',
        route: AcademicDepartmentRouter,
    },
    {
        path: '/semester-registrations',
        route: semesterRegistrationRoutes,
    },
    {
        path: '/offered-courses',
        route: offeredCourseRoutes,
    },
    {
        path: '/auth',
        route: AuthRoutes,
    },
]

// router
moduleRoutes.forEach(route => router.use(route.path, route.route))


export default router;