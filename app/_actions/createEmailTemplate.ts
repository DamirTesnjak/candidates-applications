'use server';

import {getTranslations} from 'next-intl/server';
import checkFormValidation from '@/utils/utilsServer/checkFormValidation';
import { connectToDB } from '@/utils/dbConfig/dbConfig';
import { getFormDataObject } from '@/utils/formValidation/getFormDataObject';
import { uploadFile } from '@/utils/uploadFile';
import { IPrevState } from '@/utils/types/prevState';
import { DATABASES, FILE_TYPE } from '@/constants/constants';

export async function createEmailTemplate(
  _prevState: IPrevState,
  formData: FormData,
) {
  const translation = await getTranslations('serverAction');
  const formDataObject = getFormDataObject(formData);

  // Return early if the form data is invalid
  const { errorFieldValidation, error, prevStateFormData } =
    checkFormValidation({
      formData,
      formDataObject,
      errorMessage: 'ERROR_UPDATE_CANDIDATE: inputField validation error',
    });

  if (error) {
    return {
      errorFieldValidation,
      error,
      prevState: prevStateFormData,
    };
  }

  const Model = await connectToDB(DATABASES.emailTemplates);

  if (!Model) {
    console.log(
      'ERROR_CREATE_EMAIL_TEMPLATE: Error with connecting to the database!',
    );
    return {
      errorMessage: translation('somethingWentWrong'),
      error: true,
      prevState: formDataObject,
    };
  }

  const companyLogoPicture = await uploadFile(formData, FILE_TYPE.image);

  const newEmailTemplate = new Model({
    emailType: formDataObject.emailType,
    emailText: formDataObject.emailText,
    companyLogo: companyLogoPicture,
  });

  const savedEmailTemplate = await newEmailTemplate.save();

  if (savedEmailTemplate !== newEmailTemplate) {
    console.log(
      'ERROR_CREATE_EMAIL_TEMPLATE: Error with saving new email template to the database!',
    );
    return {
      errorMessage: translation('cannotSaveChanges'),
      error: true,
      prevState: formDataObject,
    };
  }

  return {
    successMessage: translation('savedChanges'),
    success: true,
    prevState: formDataObject,
  };
}
