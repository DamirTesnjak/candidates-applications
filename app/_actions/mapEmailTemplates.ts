'use server';

import { Model } from 'mongoose';
import { connectToDB } from '@/utils/dbConfig/dbConfig';
import { getFormDataObject } from '@/utils/formValidation/getFormDataObject';
import { formValidation } from '@/utils/formValidation/formValidation';
import { IMappedEmailTemplates } from '@/utils/dbConfig/models/mappedEmailTemplates';
import { DATABASES } from '@/constants/constants';

export async function mapEmailTemplates(formData: FormData) {
  const validatedFields = formValidation(formData);
  const formDataObject = getFormDataObject(formData);

  // Return early if the form data is invalid
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }
  const Model = connectToDB(
    DATABASES.mappedEmailTemplates,
  ) as Model<IMappedEmailTemplates>;

  if (!Model) {
    console.log(
      'ERROR_MAP_EMAIL_TEMPLATES: Error with connecting to the database!',
    );
    return {
      errorMessage:
        'Something went wrong, please try again or contact support.',
      error: true,
    };
  }

  const mappedEmailTemplatesSettings = await Model.find({});
  if (mappedEmailTemplatesSettings.length > 0) {
    console.log('Found mapped email templates! Updating with new values');

    const mappedEmailTemplateSetting = await Model.findById(
      mappedEmailTemplatesSettings[0]._id,
    );

    if (mappedEmailTemplateSetting) {
      mappedEmailTemplateSetting.archive = formDataObject.archive as string;
      mappedEmailTemplateSetting.hire = formDataObject.hire as string;
      mappedEmailTemplateSetting.reject = formDataObject.reject as string;
    }
    const savedMappedEmailSettings = await mappedEmailTemplateSetting?.save();
    if (!savedMappedEmailSettings) {
      console.log(
        'ERROR_UPDATE_MAP_EMAIL_TEMPLATES: Error with updating mapped email templates to the database!',
      );
      return {
        errorMessage:
          'Something went wrong, cannot save changes, please try again or contact support.',
        error: true,
      };
    }
    return;
  }

  const newMappedEmailSettings = new Model({
    archive: formDataObject.archive,
    hire: formDataObject.hire,
    reject: formDataObject.reject,
  });

  const savedMappedEmailSettings = await newMappedEmailSettings.save();

  if (savedMappedEmailSettings !== newMappedEmailSettings) {
    console.log(
      'ERROR_MAP_EMAIL_TEMPLATES: Error with saving new mapped email templates to the database!',
    );
    return {
      errorMessage: 'Cannot create user! Please try again or contact support!',
      error: true,
    };
  }

  return {
    message: 'New mapped email settings created successfully',
    success: true,
  };
}
