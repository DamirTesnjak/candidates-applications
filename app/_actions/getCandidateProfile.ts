'use server'

import { connectToDB } from "@/utils/dbConfig/dbConfig";
import {DATABASES} from "@/constants/constants";

export async function getCandidateProfile(id: string) {
    const Model = connectToDB(DATABASES.candidates);

    if (!Model) {
        console.log('ERROR_GET_CANDIDATE_PROFILE: Error with connecting to the database!');
        return {
            errorMessage: "Something went wrong, please try again or contact support.",
            error: true,
        }
    }

    const candidate = await Model?.findById(id);
    if (!candidate) {
        return {
            errorMessage: "Candidate not found!",
            error: true,
        }
    };

    return JSON.stringify({
        successMessage: "Candidate found",
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