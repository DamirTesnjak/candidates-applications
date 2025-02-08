import {z, ZodNumber, ZodObject, ZodString} from "zod";
import {IFormDataType} from "@/utils/types/formDataType";

export function getFormValidationSchema(formDataObject: IFormDataType) {
    const fieldsKeys = Object.keys(formDataObject);
    console.log('formDataObject', formDataObject);
    const schemaShape: {
        [x: string]: ZodString | ZodObject<{[x:string]: ZodString | ZodNumber}>
    } = {};

    const setSchemaField = (field: string) => {
        const fieldType = typeof formDataObject[field];
        if (fieldType === "string" && field !== "password" && field !== "email" && field !== "file" && !field.includes("$")) {
            schemaShape[field] = z.string().min(1, { message: `${field} is required` });
        }
        if (field === "password") {
            schemaShape[field] = z.string().min(10, { message: "Must be 10 or more characters long" })
        }
        if (field === "email") {
            schemaShape[field] = z.string()
                .min(1,{ message: `${field} is required`})
                .email({ message: "Invalid email address"})
        }
        if (field === "file" || field === "profilePicture") {
            schemaShape[field] = z.object({
                size: z.number(),
                type: z.string(),
                name: z.string().refine((val) => val !== "undefined", {
                    message: `${field} is required`,
                }),
                lastModified: z.number(),
            })
        }
    };

    for (const field in fieldsKeys) {
        console.log('fieldsKeys[field]', fieldsKeys[field])
        setSchemaField(fieldsKeys[field]);
    }

    return z.object(schemaShape)
}