'use server';

import { Model } from 'mongoose';
import {getTranslations} from 'next-intl/server';
import { connectToDB } from '@/utils/dbConfig/dbConfig';
import { IEmailTemplateSchema } from '@/utils/dbConfig/models/emailTemplateModel';
import { DATABASES } from '@/constants/constants';

export async function getEmailTemplates() {
  const translation = await getTranslations('serverAction');

  const Model = await connectToDB(
    DATABASES.emailTemplates,
  ) as Model<IEmailTemplateSchema>;

  if (!Model) {
    console.log(
      'ERROR_GET_EMAIL_TEMPLATES: Error with connecting to the database!',
    );
    return JSON.stringify({
      errorMessage: translation("somethingWentWrong"),
      error: true,
    });
  }

  const emailTemplates: IEmailTemplateSchema[] = await Model.find({});

  if (!emailTemplates) {
    return JSON.stringify({
      errorMessage: translation("cannotFindAnyEmailTemplates"),
      error: true,
    });
  }

  if (emailTemplates.length === 0) {
    return JSON.stringify({
      errorMessage: translation("noEmailTemplatesFound"),
      error: true,
    });
  }
  return JSON.stringify({
    successMessage: 'Fetching data successful!',
    success: true,
    emailTemplates,
  });
}
