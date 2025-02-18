'use server';

import { Model } from 'mongoose';
import {getTranslations} from 'next-intl/server';
import { connectToDB } from '@/utils/dbConfig/dbConfig';
import { ICandidateSchema } from '@/utils/dbConfig/models/candidateModel.js';
import { DATABASES } from '@/constants/constants';

export async function getCandidates() {
  const translation = await getTranslations('serverAction');
  const Model = connectToDB(DATABASES.candidates) as Model<ICandidateSchema>;

  if (!Model) {
    console.log('ERROR_GET_CANDIDATES: Error with connecting to the database!');
    return JSON.stringify({
      errorMessage: translation('somethingWentWrong'),
      error: true,
    });
  }

  const candidates: ICandidateSchema[] = await Model.find({});

  const mappedCandidates = candidates.map((candidate) => ({
    id: candidate._id,
    name: candidate.name,
    surname: candidate.surname,
    profilePicture: {
      ...candidate.profilePicture,
      file: {
        ...candidate.profilePicture.file,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        data: candidate.profilePicture.file.data.toString('base64'),
      },
    },
    curriculumVitae: {
      ...candidate.curriculumVitae,
      file: {
        ...candidate.curriculumVitae.file,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        data: candidate.curriculumVitae.file.data.toString('base64'),
      },
    },
    contact: candidate.contact,
    status: candidate.status,
  }));

  if (!candidates) {
    return JSON.stringify({
      errorMessage: translation('cannotFindAnyCandidates'),
      error: true,
    });
  }

  if (candidates.length === 0) {
    return JSON.stringify({
      errorMessage: translation('candidateNotFound'),
      error: true,
    });
  }

  console.log('mappedCandidates', mappedCandidates);
  return JSON.stringify({
    successMessage: 'Fetching data successful!',
    success: true,
    candidates: mappedCandidates,
  });
}
