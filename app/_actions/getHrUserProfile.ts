'use server'

import { getDataFromToken } from "@/utils/getDataFromToken";
import { connectToDB } from "@/utils/dbConfig/dbConfig";
import {DATABASES} from "@/constants/constants";

export async function getHrUserProfile() {
    const tokenData = await getDataFromToken();

    const Model = connectToDB(DATABASES.hrUsers);
    const user = await Model?.findOne({id: tokenData.id})
        .select("-password");
    if (!user) {
        return JSON.stringify({
            error: "User not found!",
        })
    }

    return JSON.stringify({
        message: "User found",
        data: {
            id: user._id,
            name: user.name,
            surname: user.surname,
            phoneNumber: user.phoneNumber,
            email: user.email,
            profilePicture: user.profilePicture,
        },
    })
}