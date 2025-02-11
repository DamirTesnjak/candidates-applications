import { IFormDataObject } from '@/utils/formValidation/getFormDataObject';
import { IFormDataType } from '@/utils/types/formDataType';

export interface IPrevState {
  errorMessage?: string;
  error?: boolean;
  successMessage?: string;
  success?: boolean;
  errorFieldValidation?: {[p: string]: string};
  prevState?: IFormDataObject | IFormDataType;

}