'use server'

import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import { connectToDB } from "@/utils/dbConfig/dbConfig"
import {DATABASES} from "@/constants/constants";
import { redirect } from 'next/navigation';

export async function deleteProfileInfo(formData: FormData) {
    const formDataObject = getFormDataObject(formData);

    const Model = connectToDB(DATABASES[formDataObject.databaseName!]);
    if (!Model) {
        console.log('ERROR_DELETE_PROFILE: Error with connecting to the database!');
        return {
            errorMessage: "Something went wrong, please try again or contact support.",
            error: true,
        }
    }
    // check if user already exists
    const profile = await Model.findById(formDataObject.id);
    console.log('deleted profile', profile);
    const deletedProfile = await profile.deleteOne();

    if (!deletedProfile) {
        console.log('ERROR_DELETE_PROFILE: Error with deleting the profile from the database!');
        return {
            errorMessage: "Something went wrong, cannot save changes, please try again or contact support.",
            error: true,
        }
    }

    if (DATABASES.hrUsers === DATABASES[formDataObject.databaseName!]) {
        redirect('/login');
    }

    if (DATABASES.candidates === DATABASES[formDataObject.databaseName!]) {
        redirect('/candidates');
    }

    return {
        successMessage: "Changes saved",
        success: true,
    }
}