import { DATABASES_ENUM, IDatabaseType } from '@/constants/constants';
import { initialStateHrUser } from '@/lib/features/hrUser/hrUserSlice';
import { initialStateCandidate } from '@/lib/features/candidate/candidateSlice';

export interface ISetDataToStoreProps {
  data: typeof initialStateHrUser | typeof initialStateCandidate;
  databaseName: IDatabaseType[DATABASES_ENUM.hrUsers | DATABASES_ENUM.candidates];
}