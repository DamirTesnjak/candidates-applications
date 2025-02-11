import { updateCandidate } from '@/app/_actions/updateCandidate';
import EditForm from '@/components/EditForm/EditForm';
import { initialStateCandidate } from '@/lib/features/candidate/candidateSlice';
import { IParams } from '@/types/params';
import { STORE_REDUCER_NAME } from '@/constants/constants';
import styles from '../../candidateProfile.module.scss';

export default async function EditCandidatePage({ params }: IParams) {
  const { id } = await params;

  return (
    <div className={styles.profileForm}>
      <EditForm
        id={id}
        serverAction={updateCandidate}
        stateModel={initialStateCandidate}
        storeReducerName={STORE_REDUCER_NAME.candidate}
        editable
        showUploadPictureButton
        showUploadCVButton
      />
    </div>
  );
}
