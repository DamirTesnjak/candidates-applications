import { getFormDataObject } from '@/utils/formValidation/getFormDataObject';
import { getFormValidationSchema } from '@/utils/formValidation/getFormValidationSchema';

export async function formValidation(formData: FormData, skipFileUploadValidation?: boolean) {
  const formDataObject = getFormDataObject(formData);
  const formValidationSchema = await getFormValidationSchema(formDataObject, skipFileUploadValidation);

  return formValidationSchema.safeParse(formDataObject);
}
