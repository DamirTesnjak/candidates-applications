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

    return {
        message: "User found",
        data: candidate,
    };
};