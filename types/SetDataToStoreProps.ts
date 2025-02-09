import { IFormDataType } from '@/utils/types/formDataType';
import { DATABASES_ENUM, IDatabaseType } from '@/constants/constants';

export interface ISetDataToStoreProps {
  data: {
    errorMessage?: string;
    error?: boolean;
    successMessage?: string;
    success?: boolean;
    errorFieldValidation?: {
      [x: string]: string;
    };
    prevState?: IFormDataType;
  };
  databaseName: IDatabaseType[DATABASES_ENUM.hrUsers | DATABASES_ENUM.candidates];
}