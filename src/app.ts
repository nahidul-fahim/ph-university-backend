import express, { Application, Request, Response, NextFunction } from "express";
const app: Application = express();
import cors from "cors"
import { UserRoutes } from "./app/modules/user/user.router";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1/users", UserRoutes);



app.get('/', (req: Request, res: Response) => {
    res.send('Hello World! PH University backend is ready to deliver.')
})


// global error handler
app.use(globalErrorHandler)

export default app;