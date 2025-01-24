'use server'

import { connectToDB } from "@/utils/dbConfig/dbConfig";
import {DATABASES} from "@/constants/constants";

export async function getCandidateProfile(id: string) {
    const Model = connectToDB(DATABASES.candidates);

    const candidate = await Model?.findById(id);
    if (!candidate) {
        return {
            error: "Candidate not found!",
        }
    };

    return JSON.stringify({
        message: "Candidate found",
        data: {
            id: candidate._id,
            profilePicture: candidate.profilePicture,
            name: candidate.name,
            surname: candidate.surname,
            contact: candidate.contact,
            curriculumVitae: candidate.curriculumVitae,
            status: candidate.status,
        },
    });
}