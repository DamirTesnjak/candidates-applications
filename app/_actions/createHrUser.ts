'use server'

import { connectToDB } from "@/utils/dbConfig/dbConfig";
import nodemailer from 'nodemailer';
import bcryptjs from "bcryptjs";

import {DATABASES, EMAIL_TYPE, FILE_TYPE, FORM_INPUT_FIELD_NAME} from "@/constants/constants";
import { getFormDataObject } from "@/utils/formValidation/getFormDataObject";
import { formValidation } from "@/utils/formValidation/formValidation";
import { uploadFile } from "@/utils/uploadFile";

const sendEmail = async ({ email, emailType, userId }: any) => {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    const Model = connectToDB(DATABASES.hrUsers);

    if (!Model) {
        console.log('ERROR_SEND_EMAIL: Error with connecting to the database!');
        return {
            error: "Something went wrong, please try again or contact support.",
        }
    }

    if (emailType === EMAIL_TYPE.verify && Model) {
        await Model.findByIdAndUpdate(
            userId,
            {
                verifyToken: hashedToken,
                verifyTokenExpiry: Date.now() + 3600000
            })
    } else if (emailType === EMAIL_TYPE.reset && Model) {
        await Model.findByIdAndUpdate(
            userId,
            {
                forgotPasswordToken: hashedToken,
                forgotPasswordTokenExpiry: Date.now() + 3600000
            })
    }

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: Number(process.env.EMAIL_PORT),
        auth: {
            user: process.env.EMAIL_AUTH_USER,
            pass: process.env.EMAIL_AUTH_PASS,
        }
    })

    const mailOptions = {
        from: 'corporateEmail@gmail.com',
        to: email,
        subject: emailType === EMAIL_TYPE.verify? "Verify your email" : "Reset your password",
        html: `<p>
            Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a> to ${emailType === EMAIL_TYPE.verify ? "Verify your email!" : "Reset your password"} 
            or copy and paste the link below in your browser. <br> ${process.env.DOMAIN}/verifyemail?token=${hashedToken}
            </p>`
    }

    return await transport.sendMail(mailOptions);
}

export const createHrUser = async (formData: FormData) => {
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
        console.log('ERROR_CREATE_HR_USER: Error with connecting to the database!');
        return {
            error: "Something went wrong, please try again or contact support.",
        }
    }
    // check if user already exists
    const hrUser = await Model.findOne({ email: formDataObject.email });
    if (hrUser) {
        return {
            error: "User already exists!"
        }
    }

    // hash password
    const salt = await bcryptjs.genSalt(10)
    const hashedPassword = await bcryptjs.hash(formDataObject.password!, salt);
    const uploadedProfilePictureFile = await uploadFile(formData, FILE_TYPE.image, FORM_INPUT_FIELD_NAME.image);

    const newUser = new Model({
        profilePicture: uploadedProfilePictureFile,
        name: formDataObject.name,
        surname: formDataObject.surname,
        phoneNumber: formDataObject.phoneNumber,
        email: formDataObject.email,
        username: formDataObject.username,
        password: hashedPassword,
    })

    const savedUser = await newUser.save();

    if (savedUser !== newUser) {
        console.log('ERROR_CREATE_HR_USER: Error with saving new candidate to the database!');
        return {
            error: "Cannot create user! Please try again or contact support!",
        }
    }

    // send verification email
    const messageId = await sendEmail({
        email: formDataObject.email,
        emailType: EMAIL_TYPE.verify,
        userId: savedUser._id
    })

    if (!messageId) {
        console.log('ERROR_CREATE_HR_USER: Error with sending confirmation email!');
        return {
            error: "Something went wrong! Please try again or contact support!",
        }
    }

    return {
        message: "User created successfully",
        success: true,
    }
}