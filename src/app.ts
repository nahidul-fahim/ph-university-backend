import express, { Application, Request, Response, NextFunction } from "express";
const app: Application = express();
import cors from "cors"
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
import notFound from "./app/middlewares/notFound";
import router from "./app/routes";

// parsers
app.use(express.json());
app.use(cors());

// application routes
app.use("/api/v1", router);


const test = async (req: Request, res: Response) => {
    const a = 10;
    res.send(a)
};


// testing route
app.get('/', test)

// global error handler
app.use(globalErrorHandler)

// not found route
app.use(notFound);

export default app;