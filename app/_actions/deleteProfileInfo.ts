'use server';

import { Model } from 'mongoose';
import { connectToDB } from '@/utils/dbConfig/dbConfig';
import { getFormDataObject } from '@/utils/formValidation/getFormDataObject';
import { IHrUserSchema } from '@/utils/dbConfig/models/hrUserModel';
import { ICandidateSchema } from '@/utils/dbConfig/models/candidateModel.js';
import { DATABASES } from '@/constants/constants';
import { cookies } from 'next/headers';

export async function deleteProfileInfo(formData: FormData) {
  const cookieStore = await cookies();
  const formDataObject = getFormDataObject(formData);

  const Model = connectToDB(DATABASES[formDataObject.databaseName!]) as Model<
    IHrUserSchema | ICandidateSchema
  >;
  if (!Model) {
    console.log('ERROR_DELETE_PROFILE: Error with connecting to the database!');
    return {
      errorMessage:
        'Something went wrong, please try again or contact support.',
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
      errorMessage:
        'Something went wrong, cannot save changes, please try again or contact support.',
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
