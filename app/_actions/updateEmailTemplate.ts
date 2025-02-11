'use server'

import { getFormDataObject } from '@/utils/formValidation/getFormDataObject';
import { connectToDB } from "@/utils/dbConfig/dbConfig"
import {DATABASES} from "@/constants/constants";
import { Model } from 'mongoose';
import { IEmailTemplateSchema } from '@/utils/dbConfig/models/emailTemplateModel';
import checkFormValidation from '@/utils/utilsServer/checkFormValidation';
import { IPrevState } from '@/utils/prevState';

export async function updateEmailTemplate(prevState: IPrevState, formData: FormData) {
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
            errorMessage: "Something went wrong, please try again or contact support.",
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
            errorMessage: "Something went wrong, cannot save changes, please try again or contact support.",
            error: true,
            prevState: formDataObject,
        }
    }

    return {
        successMessage: "Changes saved",
        success: true,
        prevState: formDataObject,
    }
}