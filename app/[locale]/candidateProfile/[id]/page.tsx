import { initialStateCandidate } from '@/lib/features/candidate/candidateSlice';
import EditForm from '@/components/EditForm/EditForm';
import { STORE_REDUCER_NAME } from '@/constants/constants';
import styles from '../candidateProfile.module.scss';

export default async function CandidateProfilePage() {
  return (
    <div className={styles.profileForm}>
      <EditForm
        stateModel={initialStateCandidate}
        storeReducerName={STORE_REDUCER_NAME.candidate}
      />
    </div>
  );
}
