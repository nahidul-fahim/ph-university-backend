import { Schema, model } from "mongoose";
import { TAcademicSemester, TAcademicSemesterCode, TAcademicSemesterName, TMonths } from "./academicSemester.interface";

const MonthSchema: TMonths[] = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const AcademicSemesterNameSchema: TAcademicSemesterName[] = ['Autumn', 'Summer', 'Fall'];

const AcademicSemesterNameCode: TAcademicSemesterCode[] = ['01', '02', '03'];


const academicSemesterSchema = new Schema<TAcademicSemester>(
    {
        name: {
            type: String,
            required: true,
            enum: AcademicSemesterNameSchema,
        },
        code: {
            type: String,
            required: true,
            enum: AcademicSemesterNameCode,
        },
        year: {
            type: Date,
            required: true,
        },
        startMonth: {
            type: String,
            required: true,
            enum: MonthSchema,
        },
        endMonth: {
            type: String,
            required: true,
            enum: MonthSchema,
        }
    }
)


export const AcademicSemesterModel = model<TAcademicSemester>('academicSemester', academicSemesterSchema)