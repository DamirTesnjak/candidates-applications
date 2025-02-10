'use server'

import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import { connectToDB } from "@/utils/dbConfig/dbConfig"
import {DATABASES} from "@/constants/constants";
import { Model } from 'mongoose';
import { IEmailTemplateSchema } from '@/utils/dbConfig/models/emailTemplateModel';
import { IPrevState } from '@/utils/prevState';

export async function deleteEmailTemplate(prevState: IPrevState, formData: FormData) {
    const formDataObject = getFormDataObject(formData);

    const Model = connectToDB(DATABASES.emailTemplates) as Model<IEmailTemplateSchema>;
    if (!Model) {
        console.log('ERROR_DELETE_EMAIL_TEMPLATE: Error with connecting to the database!');
        return {
            errorMessage: "Something went wrong, please try again or contact support.",
            error: true,
        }
    }
    // check if user already exists
    const emailTemplate = await Model.findById(formDataObject.id);
    const deletedEmailTemplate = await emailTemplate?.deleteOne();

    if (!deletedEmailTemplate) {
        console.log('ERROR_DELETE_EMAIL_TEMPLATE: Error with deleting the email template from the database!');
        return {
            errorMessage: "Something went wrong, cannot save changes, please try again or contact support.",
            error: true,
        }
    }

    return {
        successMessage: "Email template deleted successfully.",
        success: true,
    }
}