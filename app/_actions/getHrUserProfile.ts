'use server'

import { getDataFromToken } from "@/utils/getDataFromToken";
import { connectToDB } from "@/utils/dbConfig/dbConfig";
import {DATABASES} from "@/constants/constants";
import { Model } from 'mongoose';
import { IHrUserSchema } from '@/utils/dbConfig/models/hrUserModel';

export async function getHrUserProfile() {
    const tokenData = await getDataFromToken();

    const Model = connectToDB(DATABASES.hrUsers) as Model<IHrUserSchema>;

    if (!Model) {
        console.log('ERROR_GET_HR_PROFILE: Error with connecting to the database!');
        return {
            errorMessage: "Something went wrong, please try again or contact support.",
            error: true,
        }
    }

    const user = await Model?.findOne({id: tokenData.id})
        .select("-password");
    if (!user) {
        return JSON.stringify({
            errorMessage: "User not found!",
            error: true,
        })
    }

    return JSON.stringify({
        message: "User found",
        data: {
            id: user._id,
            name: user.name,
            surname: user.surname,
            phoneNumber: user.phoneNumber,
            companyName: user.companyName,
            email: user.email,
            profilePicture: user.profilePicture,
            username: user.username,
        },
        success: true,
    })
}