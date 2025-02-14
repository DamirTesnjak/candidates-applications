'use server'

import { Model } from 'mongoose'
import {getTranslations} from 'next-intl/server';
import checkFormValidation from '@/utils/utilsServer/checkFormValidation';
import { connectToDB } from '@/utils/dbConfig/dbConfig';
import { getFormDataObject } from '@/utils/formValidation/getFormDataObject';
import { IEmailTemplateSchema } from '@/utils/dbConfig/models/emailTemplateModel';
import { IPrevState } from '@/utils/types/prevState';
import {DATABASES} from "@/constants/constants";

export async function updateEmailTemplate(_prevState: IPrevState, formData: FormData) {
  const translation = await getTranslations('serverAction');
  const formDataObject = getFormDataObject(formData);

  // Return early if the form data is invalid
  const { errorFieldValidation, error, prevStateFormData } = checkFormValidation({
    formData,
    formDataObject,
    errorMessage: 'ERROR_CHECK_EMAIL_TEMPLATE: inputField validation error'
  })

  if (error) {
    return {
      errorFieldValidation,
      error,
      prevState: prevStateFormData,
    }
  }

    const Model = connectToDB(DATABASES.emailTemplates) as Model<IEmailTemplateSchema>;

    if (!Model) {
        console.log('ERROR_UPDATE_EMAIL_TEMPLATE: Error with connecting to the database!');
        return {
            errorMessage: translation("somethingWentWrong"),
            error: true,
            prevState: formDataObject,
        }
    }
    // check if user already exists
    const emailTemplate = await Model.findById(formDataObject.id);
    if (emailTemplate) {
        emailTemplate.emailType = formDataObject.emailType as string;
        emailTemplate.emailText = formDataObject.emailText as string;
    }

    const savedEmailTemplate = await emailTemplate?.save();
    if (!savedEmailTemplate) {
        console.log('ERROR_UPDATE_EMAIL_TEMPLATE: Error with saving to the database!');
        return {
            errorMessage: translation("cannotSaveChanges"),
            error: true,
            prevState: formDataObject,
        }
    }

    return {
        successMessage: translation("savedChanges"),
        success: true,
        prevState: formDataObject,
    }
}