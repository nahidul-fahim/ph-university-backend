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


// testing route
app.get('/', (req: Request, res: Response) => {
    res.send('Hello World! PH University backend is ready to deliver.')
})

// global error handler
app.use(globalErrorHandler)

// not found route
app.use(notFound);

export default app;