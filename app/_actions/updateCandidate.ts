'use server'

import {formValidation} from "@/utils/formValidation/formValidation";
import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import { connectToDB } from "@/utils/dbConfig/dbConfig"
import {DATABASES, FILE_TYPE} from "@/constants/constants";
import {uploadFile} from "@/utils/uploadFile";

export async function updateCandidate(formData: FormData) {
    const validatedFields = formValidation(formData);
    const formDataObject = getFormDataObject(formData);

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        console.log('errors:', validatedFields.error.flatten().fieldErrors);
        return {
            errors: validatedFields.error.flatten().fieldErrors,
        }
    }

    const Model = connectToDB(DATABASES.candidates);
    if (!Model) {
        return {
            message: "Something went wrong, please try again or contact support.",
        }
    }
    // check if user already exists
    let User = await Model.findById({ id: formDataObject.id });
    if (User) {
        const uploadedProfilePictureFile = await uploadFile(formData, FILE_TYPE.image);
        const uploadedCurriculumVitaeFile = await uploadFile(formData, FILE_TYPE.file);

        User = {
            ...User,
            profilePicture: uploadedProfilePictureFile,
            name: formDataObject.name,
            surname: formDataObject.surname,
            contact: {
                address: formDataObject.address,
                city: formDataObject.city,
                zipCode: formDataObject.zipCode,
                country: formDataObject.country,
                email: formDataObject.email,
                phoneNumber: formDataObject.phoneNumber,
                linkedIn: formDataObject.linkedIn,
            },
            curriculumVitae: uploadedCurriculumVitaeFile,
            status: {
                archived: true,
                employed: false,
                rejected: false,
            },
        }
    }

    const savedUser = await User.save();
    if (!savedUser) {
        return {
            error: "Something went wrong, cannot save changes, please try again or contact support.",
        }
    }

    return {
        message: "Changes saved",
    }
}