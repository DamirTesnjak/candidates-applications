'use server';

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

  const Model = connectToDB(DATABASES.emailTemplates);

  if (!Model) {
    console.log(
      'ERROR_CREATE_EMAIL_TEMPLATE: Error with connecting to the database!',
    );
    return {
      errorMessage:
        'Something went wrong, please try again or contact support.',
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
      errorMessage:
        'Cannot create email template! Please try again or contact support!',
      error: true,
      prevState: formDataObject,
    };
  }

  return {
    successMessage: 'Email template created successfully',
    success: true,
    prevState: formDataObject,
  };
}
