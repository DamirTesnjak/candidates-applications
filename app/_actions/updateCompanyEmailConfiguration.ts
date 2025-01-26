'use server'

import {formValidation} from "@/utils/formValidation/formValidation";
import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import { connectToDB } from "@/utils/dbConfig/dbConfig"
import {DATABASES} from "@/constants/constants";

export async function updateCompanyEmailConfiguration(formData: FormData) {
    const validatedFields = formValidation(formData);
    const formDataObject = getFormDataObject(formData);

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        }
    }

    const Model = connectToDB(DATABASES.companyEmailConfigs);

    if (!Model) {
        console.log('ERROR_UPDATE_COMPANY_EMAIL_CONFIGURATION: Error with connecting to the database!');
        return {
            error: "Something went wrong, please try again or contact support.",
        }
    }
    // check if user already exists
    const emailConfig = await Model.findById(formDataObject.id);
    if (emailConfig) {
        emailTemplate.emailHost = formDataObject.emailHost;
        emailTemplate.port = formDataObject.port;
        emailTemplate.username = formDataObject.username;
        emailTemplate.companyName = formDataObject.companyName;
        emailTemplate.password = formDataObject.password;
    }

    const savedEmailConfig = await emailConfig.save();
    if (!savedEmailConfig) {
        console.log('ERROR_UPDATE_COMPANY_EMAIL_CONFIGURATION: Error with saving to the database!');
        return {
            error: "Something went wrong, cannot save changes, please try again or contact support.",
        }
    }

    return {
        message: "Changes saved",
        success: true,
    }
}