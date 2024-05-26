import { Router } from "express";
import { UserRoutes } from "../modules/user/user.router";
import { StudentRoutes } from "../modules/student/student.route";

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
]

// router
moduleRoutes.forEach(route => router.use(route.path, route.route))


export default router;