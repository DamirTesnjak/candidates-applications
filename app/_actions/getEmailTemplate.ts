'use server';

import { Model } from 'mongoose';
import {getTranslations} from 'next-intl/server';
import { connectToDB } from '@/utils/dbConfig/dbConfig';
import { IEmailTemplateSchema } from '@/utils/dbConfig/models/emailTemplateModel';
import { DATABASES } from '@/constants/constants';

export async function getEmailTemplate(id: string) {
  const translation = await getTranslations('serverAction');

  const Model = await connectToDB(
    DATABASES.emailTemplates,
  ) as Model<IEmailTemplateSchema>;

  if (!Model) {
    console.log(
      'ERROR_GET_EMAIL_TEMPLATE: Error with connecting to the database!',
    );
    return JSON.stringify({
      errorMessage: translation('somethingWentWrong'),
      error: true,
    });
  }

  const emailTemplate = await Model?.findById(id);
  if (!emailTemplate) {
    return JSON.stringify({
      errorMessage: translation("emailTemplateNotFound"),
      error: true,
    });
  }

  return JSON.stringify({
    successMessage: 'Email template found',
    data: {
      id: emailTemplate._id,
      emailType: emailTemplate.emailType,
      emailText: emailTemplate.emailText,
      companyLogo: emailTemplate.companyLogo,
    },
    success: true,
  });
}
