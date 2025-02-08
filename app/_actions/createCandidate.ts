'use server'

import { connectToDB } from "@/utils/dbConfig/dbConfig";
import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import {uploadFile} from "@/utils/uploadFile";
import {DATABASES, FILE_TYPE, FORM_INPUT_FIELD_NAME} from "@/constants/constants";
import { IFormDataType } from '@/utils/types/formDataType';
import checkFormValidation from '@/utils/utilsServer/checkFormValidation';
import { ICandidateSchema } from '@/utils/dbConfig/models/candidateModel.js';
import { Model } from 'mongoose';

export async function createCandidate(prevState: IFormDataType, formData: FormData) {
    const formDataObject = getFormDataObject(formData);

    // Return early if the form data is invalid
    const { errorFieldValidation, error, prevStateFormData } = checkFormValidation({
      formData,
      formDataObject,
      errorMessage: 'ERROR_CREATE_CANDIDATE: inputField validation error'
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
        console.log('ERROR_CREATE_CANDIDATE: Error with connecting to the database!');
        return {
            errorMessage: "Something went wrong, please try again or contact support.",
            error: true,
            prevState: formDataObject,
        }
    }

    const candidateFound = await Model.findOne({ "contact.email": formDataObject.email });
    if (candidateFound) {
        return {
          errorMessage: "Candidate already exists",
          error: true,
          prevState: formDataObject,

        };
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
        console.log('ERROR_CREATE_CANDIDATE: Error with saving new candidate to the database!');
        return {
            errorMessage: "Cannot create candidate! Please try again or contact support!",
            error: true,
            prevState: formDataObject,
        }
    }

    return { successMessage: "Candidate created successfully", success: true };
}