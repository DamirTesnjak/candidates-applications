'use server';

import nodemailer from 'nodemailer';
import {getTranslations, getLocale} from 'next-intl/server';
import { Model } from 'mongoose';
import { connectToDB } from '@/utils/dbConfig/dbConfig';
import { getFormDataObject } from '@/utils/formValidation/getFormDataObject';
import { IMappedEmailTemplates } from '@/utils/dbConfig/models/mappedEmailTemplates';
import { ICandidateSchema } from '@/utils/dbConfig/models/candidateModel.js';
import { ICompanyEmailSettingsSchema } from '@/utils/dbConfig/models/companyEmailSettingsModel';
import { IEmailTemplateSchema } from '@/utils/dbConfig/models/emailTemplateModel';
import { IPrevState } from '@/utils/types/prevState';
import { DATABASES } from '@/constants/constants';
import { getDataFromToken } from '@/utils/getDataFromToken';
import { IHrUserSchema } from '@/utils/dbConfig/models/hrUserModel';
import { revalidatePath } from 'next/cache';

export async function sendEmail(_prevState: IPrevState, formData: FormData) {
  const locale = getLocale();
  const translation = await getTranslations('serverAction');
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
      errorMessage: translation("somethingWentWrong"),
      error: true,
    };
  }

  const mappedEmailTemplates = await mappedEmailTemplatesModel?.find({});
  if (!mappedEmailTemplates) {
    return {
      errorMessage: translation("noEmailTemplatesFound"),
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
      errorMessage: translation("somethingWentWrong"),
      error: true,
    };
  }

  const candidate = await candidatesModel?.findById(formDataObject.id);

  if (!candidate) {
    return {
      errorMessage: translation("candidateNotFound"),
      error: true,
    };
  }

  if (emailTemplateType === 'archive') {
    candidate.status.archived = true;
    candidate.status.rejected = false;
    candidate.status.employed = false;
    candidate.status.fired = false;
  }

  if (emailTemplateType === 'reject') {
    candidate.status.archived = false;
    candidate.status.rejected = true;
    candidate.status.employed = false;
    candidate.status.fired = false;  }

  if (emailTemplateType === 'hire') {
    candidate.status.archived = false;
    candidate.status.rejected = false;
    candidate.status.employed = true;
    candidate.status.fired = false;
  }

  if (emailTemplateType === 'fire') {
    candidate.status.archived = false;
    candidate.status.rejected = false;
    candidate.status.employed = false;
    candidate.status.fired = true;
  }

  const savedCandidate = await candidate?.save();
  if (!savedCandidate) {
    console.log(
      'ERROR_GET_SEND_EMAIL_ERROR_UPDATE_CANDIDATE: Error with updating the candidate to the database!',
    );
    return {
      errorMessage: translation("cannotSaveChanges"),
      error: true,
      prevState: formDataObject,
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
      errorMessage: translation("somethingWentWrong"),
      error: true,
    };
  }

  const companyEmailConfiguration = await companyEmailConfigsModel?.find({});
  if (!companyEmailConfiguration || companyEmailConfiguration.length === 0) {
    return {
      errorMessage: translation("companyEmailConfigurationNotFound"),
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
      errorMessage: translation("somethingWentWrong"),
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
      errorMessage: translation("emailTemplateNotFound"),
      error: true,
    };
  }

  const tokenData = await getDataFromToken();

  const Model = connectToDB(DATABASES.hrUsers) as Model<IHrUserSchema>;

  if (!Model) {
    console.log('ERROR_GET_SEND_EMAIL_GET_HR_PROFILE: Error with connecting to the database!');
    return {
      errorMessage: translation("somethingWentWrong"),
      error: true,
    };
  }

  const user = await Model?.findOne({ id: tokenData.id }).select('-password');
  if (!user) {
    return {
      errorMessage: translation("userNotFound"),
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

  const emailText = emailTemplate[0].emailText
    .replaceAll('[CANDIDATE_NAME]', `${candidate.name} ${candidate.surname}`)
    .replaceAll('[COMPANY_NAME]', companyEmailConfiguration[0].companyName)
    .replaceAll('[YOUR_NAME]', `${user.name} ${user.surname}`);

  const mailOptions = {
    from: companyEmailConfiguration[0].email,
    to: candidate.contact.email,
    subject: translation('jobStatus'),
    html: emailText,
  };

  await transport.sendMail(mailOptions);

  revalidatePath(`${locale}\candidates`);

  return { successMessage: translation("emailSentToTheCandidate"), success: true };
}
