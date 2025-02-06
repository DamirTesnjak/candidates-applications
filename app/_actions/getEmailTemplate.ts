'use server'

import { connectToDB } from "@/utils/dbConfig/dbConfig";
import {DATABASES} from "@/constants/constants";

export async function getEmailTemplate(id: string) {
    const Model = connectToDB(DATABASES.emailTemplates);

    if (!Model) {
        console.log('ERROR_GET_EMAIL_TEMPLATE: Error with connecting to the database!');
        return {
            error: "Something went wrong, please try again or contact support.",
        }
    }

    const emailTemplate = await Model?.findById(id);
    if (!emailTemplate) {
        return {
            error: "Email template not found!",
        }
    };

    return JSON.stringify({
        message: "Email template found",
        data: {
            id: emailTemplate._id,
            emailType: emailTemplate.emailType,
            emailText: emailTemplate.emailText,
            companyLogo: emailTemplate.companyLogo,
        },
        success: true,
    });
}