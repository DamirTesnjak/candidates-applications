'use server';

import { Model } from 'mongoose';
import { connectToDB } from '@/utils/dbConfig/dbConfig';
import { ICandidateSchema } from '@/utils/dbConfig/models/candidateModel.js';
import { DATABASES } from '@/constants/constants';

export async function getCandidateProfile(id: string) {
  const Model = connectToDB(DATABASES.candidates) as Model<ICandidateSchema>;

  if (!Model) {
    console.log(
      'ERROR_GET_CANDIDATE_PROFILE: Error with connecting to the database!',
    );
    return JSON.stringify({
      errorMessage:
        'Something went wrong, please try again or contact support.',
      error: true,
    });
  }

  const candidate = await Model?.findById(id);
  if (!candidate) {
    return JSON.stringify({
      errorMessage: 'Candidate not found!',
      error: true,
    });
  }

  return JSON.stringify({
    successMessage: 'Candidate found',
    data: {
      id: candidate._id,
      profilePicture: candidate.profilePicture,
      name: candidate.name,
      surname: candidate.surname,
      contact: candidate.contact,
      curriculumVitae: candidate.curriculumVitae,
      status: candidate.status,
    },
    success: true,
  });
}
