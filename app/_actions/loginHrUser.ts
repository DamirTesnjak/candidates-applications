'use server'

import { connectToDB } from "@/utils/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {DATABASES} from "@/constants/constants";
import {formValidation} from "@/utils/formValidation/formValidation";
import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import { cookies } from 'next/headers';
import {redirect} from "next/navigation";

export async function loginHrUser(formData: FormData) {
    console.log("loginHrUser***********************************************************************", formData);
    const cookieStore = await cookies();
    const validatedFields = formValidation(formData);
    const formDataObject = getFormDataObject(formData);

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        }
    }

    const Model = connectToDB(DATABASES.hrUsers);

    if (!Model) {
        console.log('ERROR_LOGIN_HR_USER: Error with connecting to the database!');
        return {
            error: "Something went wrong, please try again or contact support.",
        }
    }
    // check if user already exists
    const hrUser = await Model.findOne({ username: formDataObject.username });
    if (!hrUser) {
        console.log('ERROR_LOGIN_HR_USER: User cannot be found!');
        return { error: 'Username does not exist! Please register first.' }
    }

    // check password
    const validPassword = await bcryptjs.compare(formDataObject.password!, hrUser.password)

    if(!validPassword) {
        return { error: 'Password does not match! Please try again or contact support.' }
    }

    // create token data
    const tokenData = { id: hrUser.id }

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

    cookieStore.set({
        name: "token",
        value: token,
        httpOnly: true,
    })
    return JSON.stringify({
        message: `Successfully logged in!`,
        hrUser,
        success: true,
    });
}