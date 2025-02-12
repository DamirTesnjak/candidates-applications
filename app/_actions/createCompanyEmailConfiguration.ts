'use server';

import { Model } from 'mongoose';
import checkFormValidation from '@/utils/utilsServer/checkFormValidation';
import { connectToDB } from '@/utils/dbConfig/dbConfig';
import { getFormDataObject } from '@/utils/formValidation/getFormDataObject';
import { ICompanyEmailSettingsSchema } from '@/utils/dbConfig/models/companyEmailSettingsModel';
import { IPrevState } from '@/utils/types/prevState';
import { DATABASES } from '@/constants/constants';

export async function createCompanyEmailConfiguration(
  _prevState: IPrevState,
  formData: FormData,
) {
  const formDataObject = getFormDataObject(formData);

  // Return early if the form data is invalid
  const { errorFieldValidation, error, prevStateFormData } =
    checkFormValidation({
      formData,
      formDataObject,
      errorMessage:
        'ERROR_CREATE_COMPANY_EMAIL_CONFIGURATION: inputField validation error',
    });

  if (error) {
    return {
      errorFieldValidation,
      error,
      prevState: prevStateFormData,
    };
  }

  const Model = connectToDB(
    DATABASES.companyEmailConfigs,
  ) as Model<ICompanyEmailSettingsSchema>;

  if (!Model) {
    console.log(
      'ERROR_CREATE_COMPANY_EMAIL_CONFIGURATION: Error with connecting to the database!',
    );
    return {
      errorMessage:
        'Something went wrong, please try again or contact support.',
      error: true,
      prevState: formDataObject,
    };
  }

  const companyEmailConfiguration = await Model.find({});
  if (companyEmailConfiguration.length > 0) {
    const emailConfig = await Model.findById(companyEmailConfiguration[0]._id);
    if (emailConfig) {
      emailConfig.emailHost =
        formDataObject.emailHost as ICompanyEmailSettingsSchema['emailHost'];
      emailConfig.port =
        formDataObject.port as ICompanyEmailSettingsSchema['port'];
      emailConfig.username =
        formDataObject.username as ICompanyEmailSettingsSchema['username'];
      emailConfig.companyName =
        formDataObject.companyName as ICompanyEmailSettingsSchema['companyName'];
      emailConfig.password =
        formDataObject.password as ICompanyEmailSettingsSchema['password'];
      emailConfig.email =
        formDataObject.email as ICompanyEmailSettingsSchema['email'];

      const savedEmailConfig = await emailConfig.save();

      if (savedEmailConfig !== emailConfig) {
        console.log(
          'ERROR_UPDATE_COMPANY_EMAIL_CONFIGURATION: Error with saving new email configuration to the database!',
        );
        return {
          errorMessage:
            'Cannot create company email configuration! Please try again or contact support!',
          error: true,
          prevState: formDataObject,
        };
      }
    }

    if (!emailConfig) {
      console.log(
        'ERROR_UPDATE_COMPANY_EMAIL_CONFIGURATION: Cannot find company email configuration!',
      );
      return {
        errorMessage:
          'Something went wrong, cannot save changes, please try again or contact support.',
        error: true,
        prevState: formDataObject,
      };
    }

    const savedEmailConfig = await emailConfig.save();
    if (!savedEmailConfig) {
      console.log(
        'ERROR_UPDATE_COMPANY_EMAIL_CONFIGURATION: Error with saving to the database!',
      );
      return {
        errorMessage:
          'Something went wrong, cannot save changes, please try again or contact support.',
        error: true,
        prevState: formDataObject,
      };
    }
  } else {
    const newCompanyEmailConfiguration = new Model({
      emailHost: formDataObject.emailHost,
      port: formDataObject.port,
      username: formDataObject.username,
      companyName: formDataObject.companyName,
      password: formDataObject.password,
      email: formDataObject.email,
    });
    const savedCompanyEmailConfiguration =
      await newCompanyEmailConfiguration.save();
    if (savedCompanyEmailConfiguration !== newCompanyEmailConfiguration) {
      console.log(
        'ERROR_CREATE_COMPANY_EMAIL_CONFIGURATION: Error with saving new email configuration to the database!',
      );
      return {
        errorMessage:
          'Cannot create company email configuration! Please try again or contact support!',
        error: true,
        prevState: formDataObject,
      };
    }
  }

  return {
    successMessage: 'Company email configuration saved successfully',
    success: true,
    prevState: formDataObject,
  };
}
