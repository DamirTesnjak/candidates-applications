'use server'

import {formValidation} from "@/utils/formValidation/formValidation";
import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import { connectToDB } from "@/utils/dbConfig/dbConfig"
import {DATABASES} from "@/constants/constants";

export async function updateEmailTemplate(formData: FormData) {
    const validatedFields = formValidation(formData);
    const formDataObject = getFormDataObject(formData);

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        }
    }

    const Model = connectToDB(DATABASES.emailTemplates);

    if (!Model) {
        console.log('ERROR_UPDATE_EMAIL_TEMPLATE: Error with connecting to the database!');
        return {
            error: "Something went wrong, please try again or contact support.",
        }
    }
    // check if user already exists
    const emailTemplate = await Model.findById(formDataObject.id);
    if (emailTemplate) {
        emailTemplate.emailType = formDataObject.emailType;
        emailTemplate.emailText = formDataObject.emailText;
    }

    const savedEmailTemplate = await emailTemplate.save();
    if (!savedEmailTemplate) {
        console.log('ERROR_UPDATE_EMAIL_TEMPLATE: Error with saving to the database!');
        return {
            error: "Something went wrong, cannot save changes, please try again or contact support.",
        }
    }

    return {
        message: "Changes saved",
        success: true,
    }
}