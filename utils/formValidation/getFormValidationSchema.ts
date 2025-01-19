import { z } from "zod";

export function getFormValidationSchema() {
    return z.object({
        name: z.string({ required_error: "Name is required" }),
        surname: z.string({ required_error: "Surname is required" }),
        companyName: z.string({ required_error: "Company name is required" }),
        phoneNumber: z.string({ required_error: "Phone number is required" }),
        email: z.string({ required_error: "Email address is required" }).email({ message: "Invalid email address",}),
        username: z.string().min(5, {message: "Must be 5 or more characters long"}),
        password: z.string({ required_error: "Password is required" })
            .min(10, {message: "Must be 10 or more characters long"}),
        file: z.object({
            size: z.number(),
            type: z.string(),
            name: z.string(),
            lastModified: z.number(),
        }),
    })
}