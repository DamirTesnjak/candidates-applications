import { IFormDataType } from '@/utils/types/formDataType';
import { initialStateCandidate } from '@/lib/features/candidate/candidateSlice';
import { initialStateHrUser } from '@/lib/features/hrUser/hrUserSlice';
import { initialStateCompanyEmailConfigs } from '@/lib/features/companyEmailConfigs/companyEmailConfigsSlice';

export interface IEditFormProps {
  id?: string;
  serverAction?: (formData: FormData) =>  Promise<{
    errorMessage?: string;
    error?: boolean;
    successMessage?: string;
    success?: boolean;
    errorFieldValidation?: {
      [x: string]: string;
    };
    prevState?: IFormDataType;
  }>
  stateModel: typeof initialStateCandidate | typeof initialStateHrUser | typeof initialStateCompanyEmailConfigs;
  storeReducerName: string;
  editable?: boolean;
  newProfile?: boolean;
  showUploadCVButton?: boolean;
  showUploadPictureButton?: boolean;
  hrForm?: boolean;
}