import { Schema, model } from "mongoose";
import { TAcademicFaculty } from "./academicFaculty.interface";
import AppError from "../../errors/AppError";
import httpStatus from "http-status";


const academicFacultySchema = new Schema<TAcademicFaculty>(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
    },
    {
        timestamps: true
    }
)


// checking if academic department already exists
academicFacultySchema.pre('save', async function (next) {
    const isFacultyExists = await AcademicFaculty.findOne({
        name: this.name
    })
    if (isFacultyExists) {
        throw new AppError(httpStatus.NOT_FOUND, "This department is already exists!")
    }
    next();
})


export const AcademicFaculty = model<TAcademicFaculty>('AcademicFaculty', academicFacultySchema)