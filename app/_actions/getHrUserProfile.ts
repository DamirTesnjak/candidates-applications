'use server';

import { Model } from 'mongoose'
import {getTranslations} from 'next-intl/server';
import { connectToDB } from '@/utils/dbConfig/dbConfig';
import { getDataFromToken } from '@/utils/getDataFromToken';
import { IHrUserSchema } from '@/utils/dbConfig/models/hrUserModel';
import { DATABASES } from '@/constants/constants';

export async function getHrUserProfile() {
  const translation = await getTranslations('serverAction');

  const tokenData = await getDataFromToken();
  console.log('tokenData', tokenData);

  const Model = connectToDB(DATABASES.hrUsers) as Model<IHrUserSchema>;

  if (!Model) {
    console.log('ERROR_GET_HR_PROFILE: Error with connecting to the database!');
    return JSON.stringify({
      errorMessage: translation("somethingWentWrong"),
      error: true,
    });
  }

  if (!tokenData) {
    console.log('WARNING_GET_HR_PROFILE: Token is not found!')
    return JSON.stringify({
      successMessage: '',
      success: true,
    })
  }

  const user = await Model?.findOne({ id: tokenData.id }).select('-password');
  if (!user) {
    return JSON.stringify({
      errorMessage: translation("userNotFound"),
      error: true,
    });
  }

  return JSON.stringify({
    successMessage: 'User found',
    data: {
      id: user._id,
      name: user.name,
      surname: user.surname,
      phoneNumber: user.phoneNumber,
      companyName: user.companyName,
      email: user.email,
      profilePicture: user.profilePicture,
      username: user.username,
    },
    success: true,
  });
}
