import { NextFunction, Request, Response } from "express";

const globalErrorHandler = ((err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = 500;
    let message = "Something went wrong";
    return res.status(statusCode).json({
        success: false,
        message: err.message || message,
        error: err,
    });
})


export default globalErrorHandler;