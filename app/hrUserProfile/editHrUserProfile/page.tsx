'use client'

import EditForm from '@/components/EditForm/EditForm';
import { initialStateHrUser } from '@/lib/features/hrUser/hrUserSlice';
import { updateHrUser } from '@/app/_actions/updateHrUser';
import { STORE_REDUCER_NAME } from '@/constants/constants';
import styles from '../hrUserProfile.module.scss';
import { useAppSelector } from '@/lib/hooks';

export default function EditHrUserPage() {
  const id = useAppSelector(state => state.hrUser.id);
  return (
    <div className={styles.profileForm}>
      <EditForm
        id={id}
        serverAction={updateHrUser}
        stateModel={initialStateHrUser}
        storeReducerName={STORE_REDUCER_NAME.hrUser}
        showUploadPictureButton
        editable
      />
    </div>
  );
}
