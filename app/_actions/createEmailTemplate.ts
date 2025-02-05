'use server'

import { connectToDB } from "@/utils/dbConfig/dbConfig";
import {formValidation} from "@/utils/formValidation/formValidation";
import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import {DATABASES, FILE_TYPE, FORM_INPUT_FIELD_NAME} from "@/constants/constants";
import {uploadFile} from "@/utils/uploadFile";

export async function createEmailTemplate(formData: FormData) {
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
        console.log('ERROR_CREATE_EMAIL_TEMPLATE: Error with connecting to the database!');
        return {
            error: "Something went wrong, please try again or contact support.",
        }
    }

    const companyLogoPicture = await uploadFile(formData, FILE_TYPE.image, FORM_INPUT_FIELD_NAME.companyLogo);

    const newEmailTemplate = new Model({
        emailType: formDataObject.emailType,
        emailText: formDataObject.emailText,
        companyLogo: companyLogoPicture,
    });

    const savedEmailTemplate = await newEmailTemplate.save();

    if (savedEmailTemplate !== newEmailTemplate) {
        console.log('ERROR_CREATE_EMAIL_TEMPLATE: Error with saving new email template to the database!');
        return {
            error: "Cannot create email template! Please try again or contact support!",
        }
    }

    return { message: "Email template created successfully", success: true };
}