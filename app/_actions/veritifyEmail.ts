'use server'

import {connectToDB} from "@/utils/dbConfig/dbConfig";
import {DATABASES} from "@/constants/constants";

export async function verifyEmail(token: string) {
    const Model = connectToDB(DATABASES.hrUsers)

    if (!Model) {
        console.log('ERROR_VERIFY_EMAIL: Error with connecting to the database!');
        return {
            error: "Something went wrong, please try again later or contact support",
        }
    }

    const user = await Model?.findOne({
        verifyToken: token,
        verifyTokenExpiry: { $gt: Date.now() },
    })

    if (!user) {
        return { error: "Invalid token" };
    }

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    const updatedUser = await user.save();

    if (updatedUser !== user) {
        console.log('ERROR_VERIFY_EMAIL: Error with verifying the email!');
        return {
            error: "Something went wrong during verification process, please try again or contact support",
        }
    }
}