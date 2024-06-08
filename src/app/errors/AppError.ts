// error with status code
class AppError extends Error {
    public statusCode: number;
    constructor(statusCode: number, message: string, stack = '') {
        super(message);
        this.statusCode = statusCode;

        // checking if stack is available
        if (stack) {
            this.stack = stack
        }
        else {
            Error.captureStackTrace(this, this.constructor)
        }
    }
}


export default AppError;