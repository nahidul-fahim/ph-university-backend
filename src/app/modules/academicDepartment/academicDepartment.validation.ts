import { z } from "zod";


// create validation
const createAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z.string({
            invalid_type_error: "Academic department name must be a string",
            required_error: "Academic name is required."
        }),
        academicFaculty: z.string({
            invalid_type_error: "Academic faculty must be a string",
            required_error: "Academic faculty is required"
        }),
    }),
});


// update validation
const updateAcademicDepartmentValidationSchema = z.object({
    body: z.object({
        name: z
            .string({
                invalid_type_error: "Academic department name must be a string",
                required_error: "Academic name is required."
            })
            .optional(),
        academicFaculty: z
            .string({
                invalid_type_error: "Academic faculty must be a string",
                required_error: "Academic faculty is required"
            })
            .optional(),
    }),
});


export const AcademicDepartmentValidation = {
    createAcademicDepartmentValidationSchema,
    updateAcademicDepartmentValidationSchema
}