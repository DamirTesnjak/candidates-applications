import {getFormDataObject} from "@/utils/formValidation/getFormDataObject";
import {getFormValidationSchema} from "@/utils/formValidation/getFormValidationSchema";


export function formValidation(formData: FormData) {
    const formValidationSchema = getFormValidationSchema();
    const formDataObject = getFormDataObject(formData);

    return formValidationSchema.safeParse(formDataObject);
}