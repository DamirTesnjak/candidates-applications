'use server';

import { Model } from 'mongoose';
import {getTranslations} from 'next-intl/server';
import { connectToDB } from '@/utils/dbConfig/dbConfig';
import { getFormDataObject } from '@/utils/formValidation/getFormDataObject';
import { IHrUserSchema } from '@/utils/dbConfig/models/hrUserModel';
import { ICandidateSchema } from '@/utils/dbConfig/models/candidateModel.js';
import { DATABASES } from '@/constants/constants';
import { cookies } from 'next/headers';

export async function deleteProfileInfo(formData: FormData) {
  const translation = await getTranslations('serverAction');
  const cookieStore = await cookies();
  const formDataObject = getFormDataObject(formData);

  const Model = await connectToDB(DATABASES[formDataObject.databaseName!]) as Model<
    IHrUserSchema | ICandidateSchema
  >;
  if (!Model) {
    console.log('ERROR_DELETE_PROFILE: Error with connecting to the database!');
    return {
      errorMessage: translation("somethingWentWrong"),
      error: true,
    };
  }
  // check if user already exists
  const profile = await Model.findById(formDataObject.id);
  const deletedProfile = await profile?.deleteOne();

  if (!deletedProfile) {
    console.log(
      'ERROR_DELETE_PROFILE: Error with deleting the profile from the database!',
    );
    return {
      errorMessage: translation("cannotSaveChanges"),
      error: true,
    };
  }

  if (DATABASES.hrUsers === DATABASES[formDataObject.databaseName!]) {
    cookieStore.delete('token');
  }

  return {
    successMessage: 'Changes saved',
    success: true,
  };
}
