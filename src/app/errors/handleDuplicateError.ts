import { TErrorSources, TGenericErrorResponse } from "../interface/error";



// handle duplicate error
const handleDuplicateError = (err: any): TGenericErrorResponse => {
    // extracting the error message
    const match = err?.message.match(/"([^"]*)"/);
    // The extracted value will be in the first capturing group
    const extractedMessage = match && match[1];


    const statusCode = 400;
    const errorSources: TErrorSources = [{
        path: "",
        message: `${extractedMessage} is already exists!`
    }]


    return {
        statusCode,
        message: "Invalid ID",
        errorSources
    }
}

export default handleDuplicateError;