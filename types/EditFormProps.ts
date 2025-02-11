import { initialStateCandidate } from '@/lib/features/candidate/candidateSlice';
import { initialStateHrUser } from '@/lib/features/hrUser/hrUserSlice';
import { initialStateCompanyEmailConfigs } from '@/lib/features/companyEmailConfigs/companyEmailConfigsSlice';
import { IPrevState } from '@/utils/prevState';

export interface IEditFormProps {
  id?: string;
  serverAction?: (prevState: IPrevState, formData: FormData) =>  Promise<Partial<IPrevState>>;
  stateModel: typeof initialStateCandidate | typeof initialStateHrUser | typeof initialStateCompanyEmailConfigs;
  storeReducerName: string;
  editable?: boolean;
  newProfile?: boolean;
  showUploadCVButton?: boolean;
  showUploadPictureButton?: boolean;
  hrForm?: boolean;
}