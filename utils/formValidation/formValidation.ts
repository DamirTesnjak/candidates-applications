import { getFormDataObject } from '@/utils/formValidation/getFormDataObject';
import { getFormValidationSchema } from '@/utils/formValidation/getFormValidationSchema';

export function formValidation(formData: FormData, skipFileUploadValidation?: boolean) {
  const formDataObject = getFormDataObject(formData);
  const formValidationSchema = getFormValidationSchema(formDataObject, skipFileUploadValidation);

  return formValidationSchema.safeParse(formDataObject);
}
