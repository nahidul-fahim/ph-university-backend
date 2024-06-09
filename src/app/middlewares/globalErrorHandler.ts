import { ErrorRequestHandler } from "express";

const globalErrorHandler: ErrorRequestHandler = ((err, req, res, next) => {

    // setting default values
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong";

    // declaring type for error sources
    type TErrorSources = {
        path: string | number,
        message: string,
    } []

    const errorSource: TErrorSources = [
        {
            path: '',
            message: 'Something went wrong'
        }
    ]


    return res.status(statusCode).json({
        success: false,
        message,
        errorSource,
        // error: err,
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
*/