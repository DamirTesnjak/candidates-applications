'use server'

import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import { connectToDB } from "@/utils/dbConfig/dbConfig"
import {DATABASES, FILE_TYPE, FORM_INPUT_FIELD_NAME} from "@/constants/constants";
import {uploadFile} from "@/utils/uploadFile";
import checkFormValidation from '@/utils/utilsServer/checkFormValidation';
import { Model } from 'mongoose';
import { ICandidateSchema } from '@/utils/dbConfig/models/candidateModel.js';
import { IPrevState } from '@/utils/prevState';

export async function updateCandidate(prevState: IPrevState, formData: FormData) {
    const formDataObject = getFormDataObject(formData);

    // Return early if the form data is invalid
    const { errorFieldValidation, error, prevStateFormData } = checkFormValidation({
      formData,
      formDataObject,
      errorMessage: 'ERROR_UPDATE_CANDIDATE: inputField validation error'
    })

    if (error) {
      return {
        errorFieldValidation,
        error,
        prevState: prevStateFormData,
      }
    }

    const Model = connectToDB(DATABASES.candidates) as Model<ICandidateSchema>;

    if (!Model) {
        console.log('ERROR_UPDATE_CANDIDATE: Error with connecting to the database!');
        return {
            errorMessage: "Something went wrong, please try again or contact support.",
            error: true,
            prevState: formDataObject
        }
    }
    // check if user already exists
    const candidate = await Model.findById(formDataObject.id);
    if (candidate) {
        const uploadedProfilePictureFile = await uploadFile(formData, FILE_TYPE.image, FORM_INPUT_FIELD_NAME.image);
        const uploadedCurriculumVitaeFile = await uploadFile(formData, FILE_TYPE.file, FORM_INPUT_FIELD_NAME.file);

        candidate.profilePicture = uploadedProfilePictureFile || candidate.profilePicture;
        candidate.name = formDataObject.name as string;
        candidate.surname = formDataObject.surname as string;
        candidate.contact = <ICandidateSchema["contact"]>{
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


    const savedCandidate = await candidate?.save();
    if (!savedCandidate) {
        console.log('ERROR_UPDATE_CANDIDATE: Error with updating the candidate to the database!');
        return {
            errorMessage: "Something went wrong, cannot save changes, please try again or contact support.",
            error: true,
            prevState: formDataObject,
        }
    }

    return {
        successMessage: "Changes saved",
        success: true,
        prevState: formDataObject,
    }
}