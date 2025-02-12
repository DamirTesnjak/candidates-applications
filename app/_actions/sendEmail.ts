'use server';

import nodemailer from 'nodemailer';
import { Model } from 'mongoose';
import { connectToDB } from '@/utils/dbConfig/dbConfig';
import { getFormDataObject } from '@/utils/formValidation/getFormDataObject';
import { IMappedEmailTemplates } from '@/utils/dbConfig/models/mappedEmailTemplates';
import { ICandidateSchema } from '@/utils/dbConfig/models/candidateModel.js';
import { ICompanyEmailSettingsSchema } from '@/utils/dbConfig/models/companyEmailSettingsModel';
import { IEmailTemplateSchema } from '@/utils/dbConfig/models/emailTemplateModel';
import { IPrevState } from '@/utils/types/prevState';
import { DATABASES } from '@/constants/constants';

export async function sendEmail(_prevState: IPrevState, formData: FormData) {
  const formDataObject = getFormDataObject(formData);
  const { emailTemplateType } = formDataObject;

  const mappedEmailTemplatesModel = connectToDB(
    DATABASES.mappedEmailTemplates,
  ) as Model<IMappedEmailTemplates>;

  if (!mappedEmailTemplatesModel) {
    console.log(
      'ERROR_GET_SEND_EMAIL_MAPPED_EMAIL_TEMPLATES: Error with connecting to the database!',
    );
    return {
      errorMessage:
        'Something went wrong, please try again or contact support.',
      error: true,
    };
  }

  const mappedEmailTemplates = await mappedEmailTemplatesModel?.find({});
  if (!mappedEmailTemplates) {
    return {
      errorMessage: 'Mapped email templates not found!',
      error: true,
    };
  }

  const candidatesModel = connectToDB(
    DATABASES.candidates,
  ) as Model<ICandidateSchema>;

  if (!candidatesModel) {
    console.log(
      'ERROR_GET_SEND_EMAIL_PROFILE: Error with connecting to the database!',
    );
    return {
      errorMessage:
        'Something went wrong, please try again or contact support.',
      error: true,
    };
  }

  const candidate = await candidatesModel?.findById(formDataObject.id);

  if (!candidate) {
    return {
      errorMessage: 'Candidate not found!',
      error: true,
    };
  }

  const companyEmailConfigsModel = connectToDB(
    DATABASES.companyEmailConfigs,
  ) as Model<ICompanyEmailSettingsSchema>;

  if (!companyEmailConfigsModel) {
    console.log(
      'ERROR_GET_SEND_EMAIL_COMPANY_EMAIL_CONFIGURATION: Error with connecting to the database!',
    );
    return {
      errorMessage:
        'Something went wrong, please try again or contact support.',
      error: true,
    };
  }

  const companyEmailConfiguration = await companyEmailConfigsModel?.find({});
  if (!companyEmailConfiguration || companyEmailConfiguration.length === 0) {
    return {
      errorMessage: 'Company email configuration not found! Cannot send the email!',
      error: true,
    };
  }

  const emailTemplateModel = connectToDB(
    DATABASES.emailTemplates,
  ) as Model<IEmailTemplateSchema>;

  if (!emailTemplateModel) {
    console.log(
      'ERROR_GET_SEND_EMAIL_PROFILE_EMAIL_TEMPLATE: Error with connecting to the database!',
    );
    return {
      errorMessage:
        'Something went wrong, please try again or contact support.',
      error: true,
    };
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const emailType = mappedEmailTemplates[0][emailTemplateType!];
  const emailTemplate = await emailTemplateModel?.find({
    emailType: emailType,
  });

  if (!emailTemplate || (emailTemplate && emailTemplate.length === 0)) {
    return {
      errorMessage: 'Email template not found!',
      error: true,
    };
  }

  const transport = nodemailer.createTransport({
    host: companyEmailConfiguration[0].emailHost,
    port: companyEmailConfiguration[0].port,
    auth: {
      user: companyEmailConfiguration[0].username,
      pass: companyEmailConfiguration[0].password,
    },
  });

  const mailOptions = {
    from: companyEmailConfiguration[0].email,
    to: candidate.contact.email,
    subject: 'Job application',
    html: emailTemplate[0].emailText,
  };

  await transport.sendMail(mailOptions);

  return { successMessage: 'Email sent to the candidate!', success: true };
}
