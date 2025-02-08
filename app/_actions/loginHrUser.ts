'use server'

import { connectToDB } from "@/utils/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {DATABASES} from "@/constants/constants";
import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import { cookies } from 'next/headers';
import checkFormValidation from '@/utils/utilsServer/checkFormValidation';
import { IFormDataType } from '@/utils/types/formDataType';

export async function loginHrUser(prevState: IFormDataType, formData: FormData) {
    const cookieStore = await cookies();
    const formDataObject = getFormDataObject(formData);

  // Return early if the form data is invalid
  const { errorFieldValidation, error, prevStateFormData } = checkFormValidation({
    formData,
    formDataObject,
    errorMessage: 'ERROR_UPDATE_HR_USER: inputField validation error'
  })

  if (error) {
    return {
      errorFieldValidation,
      error,
      prevState: prevStateFormData,
    }
  }

    const Model = connectToDB(DATABASES.hrUsers);

    if (!Model) {
        console.log('ERROR_LOGIN_HR_USER: Error with connecting to the database!');
        return {
            errorMessage: "Something went wrong, please try again or contact support.",
            error: true,
            prevState: formDataObject,
        }
    }
    // check if user already exists
    const hrUser = await Model.findOne({ username: formDataObject.username });
    if (!hrUser) {
        console.log('ERROR_LOGIN_HR_USER: User cannot be found!');
        return {
          errorMessage: 'Username does not exist! Please register first.',
          error: true,
          prevState: formDataObject,
        }
    }

    // check password
    const validPassword = await bcryptjs.compare(formDataObject.password!, hrUser.password)

    if(!validPassword) {
        return {
          errorMessage: 'Password does not match! Please try again or contact support.',
          error: true,
          prevState: formDataObject,
        }
    }

    // create token data
    const tokenData = { id: hrUser.id }

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

    cookieStore.set({
        name: "token",
        value: token,
        httpOnly: true,
    })
    return {
        successMessage: `Successfully logged in!`,
        success: true,
    };
}