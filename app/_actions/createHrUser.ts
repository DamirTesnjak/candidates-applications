'use server'

import { connectToDB } from "@/utils/dbConfig/dbConfig";
import nodemailer from 'nodemailer';
import bcryptjs from "bcryptjs";

import {DATABASES, EMAIL_TYPE, FILE_TYPE, FORM_INPUT_FIELD_NAME} from "@/constants/constants";
import { getFormDataObject } from "@/utils/formValidation/getFormDataObject";
import { formValidation } from "@/utils/formValidation/formValidation";
import { uploadFile } from "@/utils/uploadFile";

const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        // create a hashed token
        const hashedToken = await bcryptjs.hash(userId.toString(), 10);

        const Model = connectToDB(DATABASES.hrUsers);

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
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "85d6e126e9e1d4",
                pass: "645541768dc588"
            }
            //TODO: add these credential to .env file
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
    } catch (error: any) {
        throw new Error(error.message);
    }
}

export const createHrUser = async (formData: FormData) => {
    try {
        const validatedFields = formValidation(formData);
        const formDataObject = getFormDataObject(formData);

        // Return early if the form data is invalid
        if (!validatedFields.success) {
            console.log('errors:', validatedFields.error.flatten().fieldErrors);
            return {
                errors: validatedFields.error.flatten().fieldErrors,
            }
        }

        const Model = connectToDB(DATABASES.hrUsers);
        if (!Model) {
            return {
                message: "Something went wrong, please try again or contact support.",
            }
        }
        // check if user already exists
        const User = await Model.findOne({ email: formDataObject.email });
        if (User) {
            return {
                message: "User already exists!"
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
            return {
                error: "Something went wrong! Please try again or contact support!",
            }
        }

        return {
            message: "User created successfully",
            success: true,
        }
    } catch (error) {
        console.log('error', error);
        return {
            error: "Cannot connect to the database!",
            success: false,
        }
    }
}