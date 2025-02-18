'use server';

import { Model } from 'mongoose';
import {getTranslations} from 'next-intl/server';
import { connectToDB } from '@/utils/dbConfig/dbConfig';
import { getFormDataObject } from '@/utils/formValidation/getFormDataObject';
import { IEmailTemplateSchema } from '@/utils/dbConfig/models/emailTemplateModel';
import { DATABASES } from '@/constants/constants';
import {redirect} from '@/i18n/routing';
import {getLocale} from 'next-intl/server';

export async function deleteEmailTemplate(
  formData: FormData,
) {
  const translation = await getTranslations('serverAction');
  const locale = await getLocale();
  const formDataObject = getFormDataObject(formData);

  const Model = connectToDB(
    DATABASES.emailTemplates,
  ) as Model<IEmailTemplateSchema>;
  if (!Model) {
    console.log(
      'ERROR_DELETE_EMAIL_TEMPLATE: Error with connecting to the database!',
    );
    return {
      errorMessage: translation("somethingWentWrong"),
      error: true,
    };
  }
  // check if user already exists
  const emailTemplate = await Model.findById(formDataObject.id);
  const deletedEmailTemplate = await emailTemplate?.deleteOne();

  if (!deletedEmailTemplate) {
    console.log(
      'ERROR_DELETE_EMAIL_TEMPLATE: Error with deleting the email template from the database!',
    );
    return {
      errorMessage: translation("cannotSaveChanges"),
      error: true,
    };
  }
  redirect({
      href:'/settings/overviewEmailTemplateMessages',
      locale
    });
  return {
    successMessage: translation("emailDeleted"),
    success: true,
  }

}
