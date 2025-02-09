'use server'

import { connectToDB } from "@/utils/dbConfig/dbConfig";
import {DATABASES} from "@/constants/constants";
import {ICandidateSchema} from "@/utils/dbConfig/models/candidateModel.js";
import { Model } from 'mongoose';

export async function getCandidates() {
    const Model = connectToDB(DATABASES.candidates) as Model<ICandidateSchema>

    if (!Model) {
        console.log('ERROR_GET_CANDIDATES: Error with connecting to the database!');
      return JSON.stringify({
            errorMessage: "Something went wrong, please try again or contact support.",
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
                data: candidate.profilePicture.file.data.toString("base64"),
            }
        },
        curriculumVitae: {
            ...candidate.curriculumVitae,
            file: {
                ...candidate.curriculumVitae.file,
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
                data: candidate.curriculumVitae.file.data.toString("base64"),
            }
        },
        contact: candidate.contact,
        status: candidate.status,
    }))

    if (!candidates) {
      return JSON.stringify({
          errorMessage: "Cannot find any candidates.",
          error: true
      });
    }

    if (candidates.length === 0) {
      return JSON.stringify({
            errorMessage: "No candidates found.",
            error: true,
      });
    }
    return JSON.stringify({
        message: "Fetching data successful!",
        success: true,
        candidates: mappedCandidates,
    });
}