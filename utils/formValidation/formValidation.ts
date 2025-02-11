import { getFormDataObject } from '@/utils/formValidation/getFormDataObject';
import { getFormValidationSchema } from '@/utils/formValidation/getFormValidationSchema';

export function formValidation(formData: FormData) {
  const formDataObject = getFormDataObject(formData);
  const formValidationSchema = getFormValidationSchema(formDataObject);

  return formValidationSchema.safeParse(formDataObject);
}
