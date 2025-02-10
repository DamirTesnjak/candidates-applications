'use server'

import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import { connectToDB } from "@/utils/dbConfig/dbConfig"
import {DATABASES, FILE_TYPE, FORM_INPUT_FIELD_NAME} from "@/constants/constants";
import {uploadFile} from "@/utils/uploadFile";
import checkFormValidation from '@/utils/utilsServer/checkFormValidation';
import { Model } from 'mongoose';
import { IHrUserSchema } from '@/utils/dbConfig/models/hrUserModel';
import { IPrevState } from '@/utils/prevState';

export async function updateHrUser(prevState: IPrevState, formData: FormData) {
    const formDataObject = getFormDataObject(formData);

    // Return early if the form data is invalid
    const { errorFieldValidation, error, prevStateFormData } = checkFormValidation({
        formData,
        formDataObject,
        errorMessage: 'ERROR_UPDATE_HR_USER: inputField validation error'
    })

    if (error) {
        return {
            errorFieldValidation,
            error,
            prevState: prevStateFormData,
        }
    }

    const Model = connectToDB(DATABASES.hrUsers) as Model<IHrUserSchema>;

    if (!Model) {
        console.log('ERROR_UPDATE_HR_USER: Error with connecting to the database!');
        return {
            errorMessage: "Something went wrong, please try again or contact support.",
            error: true,
            prevState: formDataObject,
        }
    }
    // check if user already exists
    const hrUser = await Model.findById(formDataObject.id);
    console.log('hrUser', hrUser);
    if (hrUser) {
        const uploadedProfilePictureFile = await uploadFile(formData, FILE_TYPE.image, FORM_INPUT_FIELD_NAME.image);
        hrUser.profilePicture = uploadedProfilePictureFile || hrUser.profilePicture;
        hrUser.name = formDataObject.name as string;
        hrUser.surname = formDataObject.surname as string;
        hrUser.phoneNumber = formDataObject.phoneNumber as string;
        hrUser.email = formDataObject.email as string;
        hrUser.username = formDataObject.username as string;
    }

    const savedHrUser = await hrUser?.save();
    if (!savedHrUser) {
        console.log('ERROR_UPDATE_HR_USER: Error with saving to the database!');
        return {
            errorMessage: "Something went wrong, cannot save changes, please try again or contact support.",
            error: true,
            prevState: formDataObject,
        }
    }

    return {
        successMessage: "User updated successfully",
        success: true,
        prevState: formDataObject,
    }
}