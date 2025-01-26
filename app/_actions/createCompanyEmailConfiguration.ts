'use server'

import { connectToDB } from "@/utils/dbConfig/dbConfig";
import {formValidation} from "@/utils/formValidation/formValidation";
import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import {DATABASES} from "@/constants/constants";

export async function createCompanyEmailConfiguration(formData: FormData) {
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
        console.log('ERROR_CREATE_COMPANY_EMAIL_CONFIGURATION: Error with connecting to the database!');
        return {
            error: "Something went wrong, please try again or contact support.",
        }
    }

    const newCompanyEmailConfiguration = new Model({
        emailHost: formDataObject.emailHost,
        port: formDataObject.port,
        username: formDataObject.username,
        companyName: formDataObject.companyName,
        password: formDataObject.password,
    });

    const savedCompanyEmailConfiguration = await newCompanyEmailConfiguration.save();

    if (savedCompanyEmailConfiguration !== newCompanyEmailConfiguration) {
        console.log('ERROR_CREATE_COMPANY_EMAIL_CONFIGURATION: Error with saving new email configuration to the database!');
        return {
            error: "Cannot create company email configuration! Please try again or contact support!",
        }
    }

    return { message: "Company email configuration created successfully", success: true };
}