'use server'

import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import { connectToDB } from "@/utils/dbConfig/dbConfig"
import {DATABASES} from "@/constants/constants";

export async function deleteProfileInfo(formData: FormData) {
    const formDataObject = getFormDataObject(formData);

    const Model = connectToDB(DATABASES[formDataObject.databaseName!]);
    if (!Model) {
        return {
            message: "Something went wrong, please try again or contact support.",
        }
    }
    // check if user already exists
    const profile = await Model.findById({ id: formDataObject.id });
    const deletedProfile = await profile.deleteOne();

    if (!deletedProfile) {
        return {
            error: "Something went wrong, cannot save changes, please try again or contact support.",
        }
    }

    return {
        message: "Changes saved",
    }
}