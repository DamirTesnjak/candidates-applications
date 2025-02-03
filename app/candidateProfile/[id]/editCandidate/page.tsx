import {updateCandidate} from "@/app/_actions/updateCandidate";
import EditForm from "@/components/EditForm/EditForm";
import {initialStateCandidate} from "@/lib/features/candidate/candidateSlice";
import {STORE_REDUCER_NAME} from "@/constants/constants";
import styles from "../../candidateProfile.module.scss";

export default function EditCandidatePage() {
    return (
        <div className={styles.profileForm}>
        <EditForm
            serverAction={updateCandidate}
            stateModel={initialStateCandidate}
            storeReducerName={STORE_REDUCER_NAME.candidate}
            editable={true}
        />
        </div>
    )
}