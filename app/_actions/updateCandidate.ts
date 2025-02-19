'use server';

import { Model } from 'mongoose';
import { getTranslations } from 'next-intl/server';
import checkFormValidation from '@/utils/utilsServer/checkFormValidation';
import { connectToDB } from '@/utils/dbConfig/dbConfig';
import { getFormDataObject } from '@/utils/formValidation/getFormDataObject';
import { uploadFile } from '@/utils/uploadFile';
import { ICandidateSchema } from '@/utils/dbConfig/models/candidateModel.js';
import { IPrevState } from '@/utils/types/prevState';
import { DATABASES, FILE_TYPE } from '@/constants/constants';

export async function updateCandidate(
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
      skipFileUploadValidation: true,
    });

  if (error) {
    return {
      errorFieldValidation,
      error,
      prevState: prevStateFormData,
    };
  }

  const Model = connectToDB(DATABASES.candidates) as Model<ICandidateSchema>;

  if (!Model) {
    console.log(
      'ERROR_UPDATE_CANDIDATE: Error with connecting to the database!',
    );
    return {
      errorMessage: translation("somethingWentWrong"),
      error: true,
      prevState: formDataObject,
    };
  }
  // check if user already exists
  const candidate = await Model.findById(formDataObject.id);
  if (candidate) {
    const uploadedProfilePictureFile = await uploadFile(
      formData,
      FILE_TYPE.image,
    );
    const uploadedCurriculumVitaeFile = await uploadFile(
      formData,
      FILE_TYPE.file,
    );

    candidate.profilePicture =
      uploadedProfilePictureFile || candidate.profilePicture;
    candidate.name = formDataObject.name as string;
    candidate.surname = formDataObject.surname as string;
    candidate.contact = <ICandidateSchema['contact']>{
      address: formDataObject.address,
      city: formDataObject.city,
      zipCode: formDataObject.zipCode,
      country: formDataObject.country,
      email: formDataObject.email,
      phoneNumber: formDataObject.phoneNumber,
      linkedIn: formDataObject.linkedIn,
    };
    candidate.curriculumVitae =
      uploadedCurriculumVitaeFile || candidate.curriculumVitae;
    candidate.status = {
      archived: formDataObject.archived === 'on',
      employed: formDataObject.employed === 'on',
      rejected: formDataObject.rejected === 'on',
      fired: formDataObject.fired === 'on',
    };
  }

  const savedCandidate = await candidate?.save();
  if (!savedCandidate) {
    console.log(
      'ERROR_UPDATE_CANDIDATE: Error with updating the candidate to the database!',
    );
    return {
      errorMessage: translation("cannotSaveChanges"),
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
