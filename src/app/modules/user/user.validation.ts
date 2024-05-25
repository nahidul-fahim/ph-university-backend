import { z } from "zod";

const userValidationSchema = z.object({
    id: z.string(),
    password: z.string().max(20, { message: "Password cannot be more than 20 characters" }),
    needsPasswordChange: z.boolean().optional(),
    role: z.enum(['admin', 'student', 'faculty']),
    status: z.enum(['in-progress', 'blocked']).default("in-progress"),
    isDeleted: z.boolean().optional().default(false)
})

export default userValidationSchema;