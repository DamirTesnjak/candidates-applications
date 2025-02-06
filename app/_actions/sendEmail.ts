'use server'

import nodemailer from "nodemailer";
import {DATABASES} from "@/constants/constants";
import {connectToDB} from "@/utils/dbConfig/dbConfig";
import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";

export async function sendEmail(formData: FormData) {
    const formDataObject = getFormDataObject(formData);

    console.log('formDataObject', formDataObject);

    const mappedEmailTemplatesModel = connectToDB(DATABASES.mappedEmailTemplates);

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

    const candidatesModel = connectToDB(DATABASES.candidates);

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

    const companyEmailConfigsModel = connectToDB(DATABASES.companyEmailConfigs);

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

    const emailTemplateModel = connectToDB(DATABASES.emailTemplates);

    if (!emailTemplateModel) {
        console.log('ERROR_GET_SEND_EMAIL_PROFILE_EMAIL_TEMPLATE: Error with connecting to the database!');
        return {
            error: "Something went wrong, please try again or contact support.",
        }
    }

    console.log('emailTemplateModel', mappedEmailTemplates[0][formDataObject.emailTemplateType]);

    const emailTemplate = await emailTemplateModel?.find({ emailType: mappedEmailTemplates[0][formDataObject.emailTemplateType] });
    console.log('emailTemplate', emailTemplate);

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

    console.log('tetst', companyEmailConfiguration[0]);

    const mailOptions = {
        from: companyEmailConfiguration[0].email,
        to: candidate.contact.email,
        subject: "Job application",
        html: emailTemplate[0].emailText,
    }

    await transport.sendMail(mailOptions);

    return { message: "Email sent to the candidate!" };
}