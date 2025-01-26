'use server'

import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import { connectToDB } from "@/utils/dbConfig/dbConfig"
import {DATABASES} from "@/constants/constants";

export async function deleteProfileInfo(formData: FormData) {
    const formDataObject = getFormDataObject(formData);

    const Model = connectToDB(DATABASES[formDataObject.databaseName!]);
    if (!Model) {
        console.log('ERROR_DELETE_PROFILE: Error with connecting to the database!');
        return {
            error: "Something went wrong, please try again or contact support.",
        }
    }
    // check if user already exists
    const profile = await Model.findById(formDataObject.id);
    const deletedProfile = await profile.deleteOne();

    if (!deletedProfile) {
        console.log('ERROR_DELETE_PROFILE: Error with deleting the profile from the database!');
        return {
            error: "Something went wrong, cannot save changes, please try again or contact support.",
        }
    }

    return {
        message: "Changes saved",
        success: true,
    }
}