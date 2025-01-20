import {z, ZodNumber, ZodObject, ZodString} from "zod";
import {IFormDataType} from "@/utils/types/formDataType";

export function getFormValidationSchema(formDataObject: IFormDataType) {
    const fieldsKeys = Object.keys(formDataObject);
    const schemaShape: {
        [x: string]: ZodString | ZodObject<{[x:string]: ZodString | ZodNumber}>
    } = {};

    const setSchemaField = (field: string) => {
        const fieldType = typeof formDataObject[field];
        if (fieldType === "string" && field !== "password" && field !== "email" && field !== "file") {
            schemaShape[field] = z.string({ required_error: `${field} is required` });
        }
        if (field === "password") {
            schemaShape[field] = z.string({ required_error: "Password is required" })
                .min(10, {message: "Must be 10 or more characters long"})
        }
        if (field === "email") {
            schemaShape[field] = z.string({ required_error: "Email address is required" })
                .email({ message: "Invalid email address"})
        }
        if (field === "file") {
            schemaShape[field] = z.object({
                size: z.number(),
                type: z.string(),
                name: z.string(),
                lastModified: z.number(),
            })
        }
    };

    for (const field in fieldsKeys) {
        setSchemaField(field);
    }

    return z.object(schemaShape)
}