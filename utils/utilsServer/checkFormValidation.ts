import { formValidation } from '@/utils/formValidation/formValidation';
import { IFormDataType } from '@/utils/types/formDataType';

export interface IcheckFormValidationArgs {
  formData: FormData;
  formDataObject: IFormDataType;
  errorMessage: string;
}

export default function checkFormValidation({
  formData,
  formDataObject,
  errorMessage,
}: IcheckFormValidationArgs) {
  const validatedFields = formValidation(formData);

  if (!validatedFields.success) {
    const errorFieldValidation: { [x: string]: string } = {};

    validatedFields.error.errors.forEach((error) => {
      errorFieldValidation[error.path[0]] = error.message;
    });

    console.log(errorMessage);

    return {
      errorFieldValidation,
      error: true,
      prevStateFormData: formDataObject,
    };
  }
  return {
    errorFieldValidation: undefined,
    error: false,
    prevStateFormData: formDataObject,
  };
}
