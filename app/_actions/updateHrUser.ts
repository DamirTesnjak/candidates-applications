'use server';

import { Model } from 'mongoose';
import {getTranslations} from 'next-intl/server';
import checkFormValidation from '@/utils/utilsServer/checkFormValidation';
import { connectToDB } from '@/utils/dbConfig/dbConfig';
import { getFormDataObject } from '@/utils/formValidation/getFormDataObject';
import { uploadFile } from '@/utils/uploadFile';
import { IHrUserSchema } from '@/utils/dbConfig/models/hrUserModel';
import { IPrevState } from '@/utils/types/prevState';
import { DATABASES, FILE_TYPE } from '@/constants/constants';

export async function updateHrUser(_prevState: IPrevState, formData: FormData) {
  const translation = await getTranslations('serverAction');
  const formDataObject = getFormDataObject(formData);

  // Return early if the form data is invalid
  const { errorFieldValidation, error, prevStateFormData } =
    checkFormValidation({
      formData,
      formDataObject,
      errorMessage: 'ERROR_UPDATE_HR_USER: inputField validation error',
      skipFileUploadValidation: true,
    });

  if (error) {
    return {
      errorFieldValidation,
      error,
      prevState: prevStateFormData,
    };
  }

  const Model = connectToDB(DATABASES.hrUsers) as Model<IHrUserSchema>;

  if (!Model) {
    console.log('ERROR_UPDATE_HR_USER: Error with connecting to the database!');
    return {
      errorMessage: translation("somethingWentWrong"),
      error: true,
      prevState: formDataObject,
    };
  }
  // check if user already exists
  const hrUser = await Model.findById(formDataObject.id);
  if (hrUser) {
    const uploadedProfilePictureFile = await uploadFile(
      formData,
      FILE_TYPE.image,
    );
    hrUser.profilePicture = uploadedProfilePictureFile || hrUser.profilePicture;
    hrUser.name = formDataObject.name as string;
    hrUser.surname = formDataObject.surname as string;
    hrUser.phoneNumber = formDataObject.phoneNumber as string;
    hrUser.email = formDataObject.email as string;
    hrUser.username = formDataObject.username as string;
  }

  const savedHrUser = await hrUser?.save();
  if (!savedHrUser) {
    console.log('ERROR_UPDATE_HR_USER: Error with saving to the database!');
    return {
      errorMessage: translation("somethingWentWrong"),
      error: true,
      prevState: formDataObject,
    };
  }

  return {
    successMessage: translation("savedChanges"),
    success: true,
    prevState: formDataObject,
  };
}
