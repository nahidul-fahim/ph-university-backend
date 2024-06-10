import { ErrorRequestHandler } from "express";
import { ZodError } from "zod";
import { TErrorSources } from "../interface/error";
import config from "../config";
import handleZodError from "../errors/handleZodError";
import handleValidationError from "../errors/handleValidationError";

const globalErrorHandler: ErrorRequestHandler = ((err, req, res, next) => {

    // setting default values
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";
    let errorSources: TErrorSources = [
        {
            path: '',
            message: 'Something went wrong'
        }
    ]



    // checking the error sources and formatting them
    if (err instanceof ZodError) {
        const simplifiedError = handleZodError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }
    else if (err?.name === "ValidationError") {
        const simplifiedError = handleValidationError(err);
        statusCode = simplifiedError?.statusCode;
        message = simplifiedError?.message;
        errorSources = simplifiedError?.errorSources;
    }



    // this is the final return
    return res.status(statusCode).json({
        success: false,
        message,
        errorSources,
        stack: config.NODE_ENV === "development" ? err?.stack : null,
        // err
    });
})


export default globalErrorHandler;


/*
Error handling pattern:
success
message
errorSource:[
path: '',
message: ''
]
stack
*/"#b9ff37"