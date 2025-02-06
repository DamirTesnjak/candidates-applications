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

    const companyEmailConfiguration = await Model.find({})
    if (companyEmailConfiguration.length > 0) {
        const emailConfig = await Model.findById(companyEmailConfiguration[0]._id);
        if (emailConfig) {
            emailConfig.emailHost = formDataObject.emailHost;
            emailConfig.port = formDataObject.port;
            emailConfig.username = formDataObject.username;
            emailConfig.companyName = formDataObject.companyName;
            emailConfig.password = formDataObject.password;
            emailConfig.email = formDataObject.email;

        }

        if (!emailConfig) {
            console.log('ERROR_UPDATE_COMPANY_EMAIL_CONFIGURATION: Cannot find company email configuration!');
            return {
                error: "Something went wrong, cannot save changes, please try again or contact support.",
            }
        }

        const savedEmailConfig = await emailConfig.save();
        if (!savedEmailConfig) {
            console.log('ERROR_UPDATE_COMPANY_EMAIL_CONFIGURATION: Error with saving to the database!');
            return {
                error: "Something went wrong, cannot save changes, please try again or contact support.",
            }
        }
        return
    }

    const newCompanyEmailConfiguration = new Model({
        emailHost: formDataObject.emailHost,
        port: formDataObject.port,
        username: formDataObject.username,
        companyName: formDataObject.companyName,
        password: formDataObject.password,
        email: formDataObject.email,
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