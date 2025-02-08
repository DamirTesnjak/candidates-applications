'use server'

import nodemailer from "nodemailer";
import {DATABASES} from "@/constants/constants";
import {connectToDB} from "@/utils/dbConfig/dbConfig";
import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import { Model } from 'mongoose';
import { IMappedEmailTemplates } from '@/utils/dbConfig/models/mappedEmailTemplates';
import { ICandidateSchema } from '@/utils/dbConfig/models/candidateModel.js';
import { ICompanyEmailSettingsSchema } from '@/utils/dbConfig/models/companyEmailSettingsModel';
import { IEmailTemplateSchema } from '@/utils/dbConfig/models/emailTemplateModel';

export async function sendEmail(formData: FormData) {
    const formDataObject = getFormDataObject(formData);

    const { emailTemplateType } = formDataObject;

    console.log('formDataObject', formDataObject);

    const mappedEmailTemplatesModel = connectToDB(DATABASES.mappedEmailTemplates) as Model<IMappedEmailTemplates>;

    if (!mappedEmailTemplatesModel) {
        console.log('ERROR_GET_SEND_EMAIL_MAPPED_EMAIL_TEMPLATES: Error with connecting to the database!');
        return {
            error: "Something went wrong, please try again or contact support.",
        }
    }

    const mappedEmailTemplates = await mappedEmailTemplatesModel?.find({})
    console.log(mappedEmailTemplates[0])
    if (!mappedEmailTemplates) {
        return {
            error: "Mapped email templates not found!",
        }
    }

    const candidatesModel = connectToDB(DATABASES.candidates) as Model<ICandidateSchema>;

    if (!candidatesModel) {
        console.log('ERROR_GET_SEND_EMAIL_PROFILE: Error with connecting to the database!');
        return {
            error: "Something went wrong, please try again or contact support.",
        }
    }

    const candidate = await candidatesModel?.findById(formDataObject.id);

    if (!candidate) {
        return {
            error: "Candidate not found!",
        }
    }

    const companyEmailConfigsModel = connectToDB(DATABASES.companyEmailConfigs) as Model<ICompanyEmailSettingsSchema>;

    if (!companyEmailConfigsModel) {
        console.log('ERROR_GET_SEND_EMAIL_COMPANY_EMAIL_CONFIGURATION: Error with connecting to the database!');
        return {
            error: "Something went wrong, please try again or contact support.",
        }
    }

    const companyEmailConfiguration = await companyEmailConfigsModel?.find({});
    if (!companyEmailConfiguration) {
        return {
            error: "Company email not found!",
        }
    }

    const emailTemplateModel = connectToDB(DATABASES.emailTemplates) as Model<IEmailTemplateSchema>;

    if (!emailTemplateModel) {
        console.log('ERROR_GET_SEND_EMAIL_PROFILE_EMAIL_TEMPLATE: Error with connecting to the database!');
        return {
            error: "Something went wrong, please try again or contact support.",
        }
    }

    const emailTemplate = await emailTemplateModel?.find({ emailType: mappedEmailTemplates[0][emailTemplateType] });

    if (!emailTemplate) {
        return {
            error: "Email template  not found!",
        }
    }


    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_AUTH_USER,
            pass: process.env.EMAIL_AUTH_PASS,
        }
    })

    const mailOptions = {
        from: companyEmailConfiguration[0].email,
        to: candidate.contact.email,
        subject: "Job application",
        html: emailTemplate[0].emailText,
    }

    await transport.sendMail(mailOptions);

    return { message: "Email sent to the candidate!" };
}