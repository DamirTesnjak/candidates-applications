'use server'

import { connectToDB } from "@/utils/dbConfig/dbConfig";
import {formValidation} from "@/utils/formValidation/formValidation";
import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import {DATABASES} from "@/constants/constants";

export async function mapEmailTemplates(formData: FormData) {
    const validatedFields = formValidation(formData);
    const formDataObject = getFormDataObject(formData);

    // Return early if the form data is invalid
    if (!validatedFields.success) {
        return {
            error: validatedFields.error.flatten().fieldErrors,
        }
    }
    const Model = connectToDB(DATABASES.mappedEmailTemplates);

    if (!Model) {
        console.log('ERROR_MAP_EMAIL_TEMPLATES: Error with connecting to the database!');
        return {
            error: "Something went wrong, please try again or contact support.",
        }
    }

    const mappedEmailTemplatesSettings = await Model.find({})
    if (mappedEmailTemplatesSettings.length > 0) {
        console.log('Found mapped email templates! Updating with new values');

        const mappedEmailTemplateSetting = await Model.findById(mappedEmailTemplatesSettings[0]._id);

        if (mappedEmailTemplateSetting) {
            mappedEmailTemplateSetting.archive = formDataObject.archive;
            mappedEmailTemplateSetting.hire = formDataObject.hire;
            mappedEmailTemplateSetting.reject = formDataObject.reject;
        }
        const savedMappedEmailSettings = await mappedEmailTemplateSetting.save();
        if (!savedMappedEmailSettings) {
            console.log('ERROR_UPDATE_MAP_EMAIL_TEMPLATES: Error with updating mapped email templates to the database!');
            return {
                error: "Something went wrong, cannot save changes, please try again or contact support.",
            }
        }
        return
    }

    const newMappedEmailSettings = new Model({
        archive: formDataObject.archive,
        hire: formDataObject.hire,
        reject: formDataObject.reject,
    });

    const savedMappedEmailSettings = await newMappedEmailSettings.save();

    if (savedMappedEmailSettings !== newMappedEmailSettings) {
        console.log('ERROR_MAP_EMAIL_TEMPLATES: Error with saving new mapped email templates to the database!');
        return {
            error: "Cannot create user! Please try again or contact support!",
        }
    }

    return { message: "New mapped email settings created successfully", success: true };
}