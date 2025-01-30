import {createCandidate} from "@/app/_actions/createCandidate";
import EditForm from "@/components/EditForm/EditForm";
import {initialStateCandidate} from "@/lib/features/candidate/candidateSlice";
import {STORE_REDUCER_NAME} from "@/constants/constants";
import styles from "../../styles/global/globals.module.scss"

export default function RegisterPage() {
    return (
        <div>
            <EditForm
                serverAction={createCandidate}
                stateModel={initialStateCandidate}
                storeReducerName={STORE_REDUCER_NAME.candidate}
                editable={true}
                newProfile={true}
            />
        </div>)
}