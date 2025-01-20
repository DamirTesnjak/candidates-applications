'use server'

import { connectToDB } from "@/utils/dbConfig/dbConfig";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import {DATABASES} from "@/constants/constants";
import {formValidation} from "@/utils/formValidation/formValidation";
import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import {redirect} from "next/navigation";
import { cookies } from 'next/headers';

export async function loginHrUser(formData: FormData) {
    const cookieStore = await cookies();
    const validatedFields = formValidation(formData);
    const formDataObject = getFormDataObject(formData);

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        console.log('errors:', validatedFields.error.flatten().fieldErrors);
        throw new Error('Something went wrong, please try again or contact support.')
    }
    const Model = connectToDB(DATABASES.hrUsers);

    if (!Model) {
        throw new Error('Something went wrong, please try again or contact support.')
    }
    // check if user already exists
    const User = await Model.findOne({ username: formDataObject.username });
    if (!User) {
        throw new Error('Username does not exist! Try again or register first.')
    }

    // check password
    const validPassword = await bcryptjs.compare(formDataObject.password!, User.password)

    if(!validPassword) {
        throw new Error('Invalid password!')
    }

    // create token data
    const tokenData = { id: User.id }

    //create token
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn: "1d"})

    cookieStore.set({
        name: "token",
        value: token,
        httpOnly: true,
    })

    redirect('/')
}