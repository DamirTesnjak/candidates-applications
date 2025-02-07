'use server'

import {formValidation} from "@/utils/formValidation/formValidation";
import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import { connectToDB } from "@/utils/dbConfig/dbConfig"
import {DATABASES, FILE_TYPE, FORM_INPUT_FIELD_NAME} from "@/constants/constants";
import {uploadFile} from "@/utils/uploadFile";

export async function updateCandidate(formData: FormData) {
    const validatedFields = formValidation(formData);
    const formDataObject = getFormDataObject(formData);

    console.log('formDataObject', formDataObject);

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        }
    }

    const Model = connectToDB(DATABASES.candidates);

    if (!Model) {
        console.log('ERROR_UPDATE_CANDIDATE: Error with connecting to the database!');
        return {
            error: "Something went wrong, please try again or contact support.",
        }
    }
    // check if user already exists
    const candidate = await Model.findById(formDataObject.id);
    if (candidate) {
        const uploadedProfilePictureFile = await uploadFile(formData, FILE_TYPE.image, FORM_INPUT_FIELD_NAME.image);
        const uploadedCurriculumVitaeFile = await uploadFile(formData, FILE_TYPE.file, FORM_INPUT_FIELD_NAME.file);

        candidate.profilePicture = uploadedProfilePictureFile || candidate.profilePicture;
        candidate.name = formDataObject.name;
        candidate.surname = formDataObject.surname;
        candidate.contact = {
            address: formDataObject.address,
            city: formDataObject.city,
            zipCode: formDataObject.zipCode,
            country: formDataObject.country,
            email: formDataObject.email,
            phoneNumber: formDataObject.phoneNumber,
            linkedIn: formDataObject.linkedIn,
        };
        candidate.curriculumVitae = uploadedCurriculumVitaeFile || candidate.curriculumVitae;
        candidate.status = {
            archived: formDataObject.archived === 'on',
            employed: formDataObject.employed === 'on',
            rejected: formDataObject.rejected === 'on',
        };
    }


    const savedCandidate = await candidate.save();
    if (!savedCandidate) {
        console.log('ERROR_UPDATE_CANDIDATE: Error with updating the candidate to the database!');
        return {
            error: "Something went wrong, cannot save changes, please try again or contact support.",
        }
    }

    return {
        message: "Changes saved",
        success: true,
    }
}