'use server';

import { Model } from 'mongoose';
import { connectToDB } from '@/utils/dbConfig/dbConfig';
import { IEmailTemplateSchema } from '@/utils/dbConfig/models/emailTemplateModel';
import { DATABASES } from '@/constants/constants';

export async function getEmailTemplates() {
  const Model = connectToDB(
    DATABASES.emailTemplates,
  ) as Model<IEmailTemplateSchema>;

  if (!Model) {
    console.log(
      'ERROR_GET_EMAIL_TEMPLATES: Error with connecting to the database!',
    );
    return JSON.stringify({
      errorMessage:
        'Something went wrong, please try again or contact support.',
      error: true,
    });
  }

  const emailTemplates: IEmailTemplateSchema[] = await Model.find({});

  if (!emailTemplates) {
    return JSON.stringify({
      errorMessage: 'Cannot find any email templates.',
      error: true,
    });
  }

  if (emailTemplates.length === 0) {
    return JSON.stringify({
      errorMessage: 'No email templates found.',
      error: true,
    });
  }
  return JSON.stringify({
    successMessage: 'Fetching data successful!',
    success: true,
    emailTemplates,
  });
}
