'use server'

import { connectToDB } from "@/utils/dbConfig/dbConfig";
import {formValidation} from "@/utils/formValidation/formValidation";
import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import {uploadFile} from "@/utils/uploadFile";
import {DATABASES, FILE_TYPE, FORM_INPUT_FIELD_NAME} from "@/constants/constants";

export async function createCandidate(formData: FormData) {
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

    const candidateFound = await Model.findOne({ id: formDataObject.id })
    if (candidateFound) {
        return { error: "User already exists" };
    }

    const uploadedProfilePictureFile = await uploadFile(formData, FILE_TYPE.image, FORM_INPUT_FIELD_NAME.image);
    const uploadedCurriculumVitaeFile = await uploadFile(formData, FILE_TYPE.file, FORM_INPUT_FIELD_NAME.file);


    const newCandidate = new Model({
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
    });

    const savedCandidate = await newCandidate.save();

    if (savedCandidate !== newCandidate) {
        return {
            error: "Cannot create user! Please try again or contact support!",
        }
    }

    return { message: "Candidate created successfully" }
}