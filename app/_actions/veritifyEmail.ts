'use server';

import { Model } from 'mongoose';
import {getTranslations} from 'next-intl/server';
import { connectToDB } from '@/utils/dbConfig/dbConfig';
import { IHrUserSchema } from '@/utils/dbConfig/models/hrUserModel';
import { DATABASES } from '@/constants/constants';

export async function verifyEmail(token: string) {
  const translation = await getTranslations('serverAction');
  const Model = connectToDB(DATABASES.hrUsers) as Model<IHrUserSchema>;

  if (!Model) {
    console.log('ERROR_VERIFY_EMAIL: Error with connecting to the database!');
    return {
      error: translation('somethingWentWrong'),
    };
  }

  const user = await Model?.findOne({
    verifyToken: token,
    verifyTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return { error: 'Invalid token' };
  }

  user.isVerified = true;
  user.verifyToken = undefined;
  user.verifyTokenExpiry = undefined;

  const updatedUser = await user.save();

  if (updatedUser !== user) {
    console.log('ERROR_VERIFY_EMAIL: Error with verifying the email!');
    return {
      error: translation('somethingWentWrong'),
    };
  }
}
