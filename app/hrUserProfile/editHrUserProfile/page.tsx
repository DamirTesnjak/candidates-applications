import EditForm from '@/components/EditForm/EditForm';
import { initialStateHrUser } from '@/lib/features/hrUser/hrUserSlice';
import { updateHrUser } from '@/app/_actions/updateHrUser';
import { STORE_REDUCER_NAME } from '@/constants/constants';
import styles from '../hrUserProfile.module.scss';

export default function EditHrUserPage() {
  return (
    <div className={styles.profileForm}>
      <EditForm
        id=''
        serverAction={updateHrUser}
        stateModel={initialStateHrUser}
        storeReducerName={STORE_REDUCER_NAME.hrUser}
        editable={true}
      />
    </div>
  );
}
