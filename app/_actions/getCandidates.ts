'use server'

import { connectToDB } from "@/utils/dbConfig/dbConfig";
import {DATABASES} from "@/constants/constants";
import {ICandidateSchema} from "@/utils/dbConfig/models/candidateModel.js";
import { Model } from 'mongoose';

export async function getCandidates() {
    const Model = connectToDB(DATABASES.candidates) as Model<ICandidateSchema>

    if (!Model) {
        console.log('ERROR_GET_CANDIDATES: Error with connecting to the database!');
        return {
            message: "Something went wrong, please try again or contact support.",
        }
    }

    const candidates: ICandidateSchema[] = await Model.find({});
    candidates.map((candidate) => ({
        ...candidate,
        profilePicture: {
            ...candidate.profilePicture,
            file: {
                ...candidate.profilePicture.file,
                data: candidate.profilePicture.file.data.toString("base64"),
            }
        },
        curriculumVitae: {
            ...candidate.curriculumVitae,
            file: {
                ...candidate.curriculumVitae.file,
                data: candidate.curriculumVitae.file.data.toString("base64"),
            }
        },
    }))

    if (!candidates) {
        return { error: "Cannot find any candidates." }
    }

    if (candidates.length === 0) {
        return {
            error: "No candidates found."
        }
    }
    return JSON.stringify({
        message: "Fetching data successful!",
        success: true,
        candidates,
    });
}