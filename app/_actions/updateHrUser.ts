'use server'

import {formValidation} from "@/utils/formValidation/formValidation";
import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import { connectToDB } from "@/utils/dbConfig/dbConfig"
import {DATABASES, FILE_TYPE, FORM_INPUT_FIELD_NAME} from "@/constants/constants";
import {uploadFile} from "@/utils/uploadFile";

export async function updateHrUser(formData: FormData) {
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
    const hrUser = await Model.findById({ id: formDataObject.id });
    if (hrUser) {
        const uploadedProfilePictureFile = await uploadFile(formData, FILE_TYPE.image, FORM_INPUT_FIELD_NAME.image);
        hrUser.profilePicture = uploadedProfilePictureFile;
        hrUser.name = formDataObject.name;
        hrUser.surname = formDataObject.surname;
        hrUser.phoneNumber = formDataObject.phoneNumber;
        hrUser.email = formDataObject.email;
        hrUser.username = formDataObject.username;
    }

    const savedHrUser = await hrUser.save();
    if (!savedHrUser) {
        return {
            error: "Something went wrong, cannot save changes, please try again or contact support.",
        }
    }

    return {
        message: "Changes saved",
    }
}