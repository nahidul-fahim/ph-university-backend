import { NextFunction, Request, RequestHandler, Response } from "express";


// higher order function to handle async request and catch error
const catchAsync: any = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(err => next(err));
    }
}

export default catchAsync;