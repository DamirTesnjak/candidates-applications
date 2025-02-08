import { IFormDataType } from "@/utils/types/formDataType";

export function getFormDataObject(formData: FormData) {
    console.log('formData', formData);
    const formDataObject: IFormDataType = {};

    for (const [key, value] of formData) {
        formDataObject[key] = value;
    }
    return formDataObject;
}