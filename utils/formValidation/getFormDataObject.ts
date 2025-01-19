import { IFormDataType } from "@/utils/types/formDataType";

export function getFormDataObject(formData: FormData) {
    const formDataObject: IFormDataType = {};

    for (const [key, value] of formData) {
        formDataObject[key] = value;
    }

    const formDataObjectKeys = Object.keys(formDataObject);
    delete formDataObject[formDataObjectKeys[0]];

    console.log('formDataObject', formDataObject);

    return formDataObject;
}