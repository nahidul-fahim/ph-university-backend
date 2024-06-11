import { TErrorSources } from './../interface/error';
import mongoose from "mongoose";
import { TGenericErrorResponse } from "../interface/error";


// handle cast error
const handleCastError = (err: mongoose.Error.CastError): TGenericErrorResponse => {
    const statusCode = 400;
    const errorSources: TErrorSources = [{
        path: err?.path,
        message: err?.message
    }]

    return {
        statusCode,
        message: "Invalid ID",
        errorSources
    }
}


export default handleCastError;