import { useDispatch, useSelector, useStore } from 'react-redux';
import type { AppDispatch, AppStore, RootState } from '@/lib/store';
import { initialStateCandidate } from '@/lib/features/candidate/candidateSlice';
import { initialStateHrUser } from '@/lib/features/hrUser/hrUserSlice';
import { initialStateCompanyEmailConfigs } from '@/lib/features/companyEmailConfigs/companyEmailConfigsSlice';
import { initialStateTutorialData } from '@/lib/features/tutorialData/tutorialDataSlice';

export interface IAppSelectorState extends RootState {
  [x: string]:
    | typeof initialStateHrUser
    | typeof initialStateCandidate
    | typeof initialStateCompanyEmailConfigs
    | typeof initialStateTutorialData;
}

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<IAppSelectorState>();
export const useAppStore = useStore.withTypes<AppStore>();
