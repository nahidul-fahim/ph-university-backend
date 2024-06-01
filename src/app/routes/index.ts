import { Router } from "express";
import { UserRoutes } from "../modules/user/user.router";
import { StudentRoutes } from "../modules/student/student.route";
import { AcademicSemesterRouter } from "../modules/academicSemester/academicSemester.route";
import { AcademicFacultyRouter } from "../modules/academicFaculty/academicFaculty.route";

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
        path: '/academic-semesters',
        route: AcademicSemesterRouter,
    },
    {
        path: '/academic-faculty',
        route: AcademicFacultyRouter,
    },
]

// router
moduleRoutes.forEach(route => router.use(route.path, route.route))


export default router;