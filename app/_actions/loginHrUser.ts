'use server';

import { Model } from 'mongoose';
import {getTranslations} from 'next-intl/server';
import { cookies } from 'next/headers';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import checkFormValidation from '@/utils/utilsServer/checkFormValidation';
import { connectToDB } from '@/utils/dbConfig/dbConfig';
import { getFormDataObject } from '@/utils/formValidation/getFormDataObject';
import { IHrUserSchema } from '@/utils/dbConfig/models/hrUserModel';
import { IPrevState } from '@/utils/types/prevState';
import { DATABASES } from '@/constants/constants';

export async function loginHrUser(_prevState: IPrevState, formData: FormData) {
  const translation = await getTranslations('serverAction');
  const cookieStore = await cookies();
  const formDataObject = getFormDataObject(formData);

  // Return early if the form data is invalid
  const { errorFieldValidation, error, prevStateFormData } =
    checkFormValidation({
      formData,
      formDataObject,
      errorMessage: 'ERROR_UPDATE_HR_USER: inputField validation error',
    });

  if (error) {
    return {
      errorFieldValidation,
      error,
      prevState: prevStateFormData,
    };
  }

  const Model = await connectToDB(DATABASES.hrUsers) as Model<IHrUserSchema>;

  if (!Model) {
    console.log('ERROR_LOGIN_HR_USER: Error with connecting to the database!');
    return {
      errorMessage: translation("somethingWentWrong"),
      error: true,
      prevState: formDataObject,
    };
  }
  // check if user already exists
  const hrUser = await Model.findOne({ username: formDataObject.username });
  if (!hrUser) {
    console.log('ERROR_LOGIN_HR_USER: User cannot be found!');
    return {
      errorMessage: translation("usernameDoesNotExist"),
      error: true,
      prevState: formDataObject,
    };
  }

  // check password
  const validPassword = await bcryptjs.compare(
    formDataObject.password!,
    hrUser.password,
  );

  if (!validPassword) {
    return {
      errorMessage: translation("passwordDoesNotMatch"),
      error: true,
      prevState: formDataObject,
    };
  }

  // create token data
  const tokenData = { id: hrUser.id };

  //create token
  const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
    expiresIn: '1d',
  });

  cookieStore.set({
    name: 'token',
    value: token,
    httpOnly: true,
  });
  return {
    successMessage: `Successfully logged in!`,
    success: true,
  };
}
