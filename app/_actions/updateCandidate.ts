'use server'

import {formValidation} from "@/utils/formValidation/formValidation";
import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import { connectToDB } from "@/utils/dbConfig/dbConfig"
import {DATABASES, FILE_TYPE, FORM_INPUT_FIELD_NAME} from "@/constants/constants";
import {uploadFile} from "@/utils/uploadFile";

export async function updateCandidate(formData: FormData) {
    const validatedFields = formValidation(formData);
    const formDataObject = getFormDataObject(formData);

    console.log('FormData', formData);



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
    const User = await Model.findById(formDataObject.id);
    if (User) {
        const uploadedProfilePictureFile = await uploadFile(formData, FILE_TYPE.image, FORM_INPUT_FIELD_NAME.image);
        const uploadedCurriculumVitaeFile = await uploadFile(formData, FILE_TYPE.file, FORM_INPUT_FIELD_NAME.file);

        console.log(uploadedCurriculumVitaeFile);

            User.profilePicture = uploadedProfilePictureFile;
            User.name = formDataObject.name;
            User.surname = formDataObject.surname;
            User.contact = {
                address: formDataObject.address,
                city: formDataObject.city,
                zipCode: formDataObject.zipCode,
                country: formDataObject.country,
                email: formDataObject.email,
                phoneNumber: formDataObject.phoneNumber,
                linkedIn: formDataObject.linkedIn,
            };
            User.curriculumVitae = uploadedCurriculumVitaeFile;
            User.status = {
                archived: formDataObject.archived === 'on',
                employed: formDataObject.employed === 'on',
                rejected: formDataObject.rejected === 'on',
            };
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