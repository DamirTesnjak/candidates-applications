'use server'

import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import { connectToDB } from "@/utils/dbConfig/dbConfig"
import {DATABASES} from "@/constants/constants";

export async function deleteEmailTemplate(formData: FormData) {
    const formDataObject = getFormDataObject(formData);

    const Model = connectToDB(DATABASES.emailTemplates);
    if (!Model) {
        console.log('ERROR_DELETE_EMAIL_TEMPLATE: Error with connecting to the database!');
        return {
            error: "Something went wrong, please try again or contact support.",
        }
    }
    // check if user already exists
    const emailTemplate = await Model.findById(formDataObject.id);
    const deletedEmailTemplate = await emailTemplate.deleteOne();

    if (!deletedEmailTemplate) {
        console.log('ERROR_DELETE_EMAIL_TEMPLATE: Error with deleting the email template from the database!');
        return {
            error: "Something went wrong, cannot save changes, please try again or contact support.",
        }
    }

    return {
        message: "Changes saved",
        success: true,
    }
}