import {initialStateHrUser} from "@/lib/features/hrUser/hrUserSlice";
import {STORE_REDUCER_NAME} from "@/constants/constants";
import EditForm from "@/components/EditForm/EditForm";
import styles from "./hrUserProfile.module.scss";

export default async function UserProfilePage() {
    return <div className={styles.profileForm}>
        <EditForm
            stateModel={initialStateHrUser}
            storeReducerName={STORE_REDUCER_NAME.hrUser}
        />
    </div>
}