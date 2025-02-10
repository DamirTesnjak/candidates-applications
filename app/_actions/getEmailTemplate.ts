'use server'

import { connectToDB } from "@/utils/dbConfig/dbConfig";
import {DATABASES} from "@/constants/constants";
import { IEmailTemplateSchema } from '@/utils/dbConfig/models/emailTemplateModel';
import { Model } from 'mongoose';

export async function getEmailTemplate(id: string) {
    const Model = connectToDB(DATABASES.emailTemplates) as Model<IEmailTemplateSchema>;

    if (!Model) {
        console.log('ERROR_GET_EMAIL_TEMPLATE: Error with connecting to the database!');
      return JSON.stringify({
            errorMessage: "Something went wrong, please try again or contact support.",
            error: true,
        });
    }

    const emailTemplate = await Model?.findById(id);
    if (!emailTemplate) {
      return JSON.stringify({
            errorMessage: "Email template not found!",
            error: true,
        });
    }

    return JSON.stringify({
        successMessage: "Email template found",
        data: {
            id: emailTemplate._id,
            emailType: emailTemplate.emailType,
            emailText: emailTemplate.emailText,
            companyLogo: emailTemplate.companyLogo,
        },
        success: true,
    });
}