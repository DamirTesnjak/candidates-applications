'use server'

import { connectToDB } from "@/utils/dbConfig/dbConfig";
import {DATABASES} from "@/constants/constants";
import {IEmailTemplateSchema} from "@/utils/dbConfig/models/emailTemplateModel";

export async function getEmailTemplates() {
    const Model = connectToDB(DATABASES.emailTemplates)

    if (!Model) {
        console.log('ERROR_GET_EMAIL_TEMPLATES: Error with connecting to the database!');
        return {
            message: "Something went wrong, please try again or contact support.",
        }
    }

    const emailTemplates: IEmailTemplateSchema[] = await Model.find({});

    if (!emailTemplates) {
        return { error: "Cannot find any email templates." }
    }

    if (emailTemplates.length === 0) {
        return {
            error: "No email templates found."
        }
    }
    return {
        message: "Fetching data successful!",
        success: true,
        emailTemplates,
    };
}