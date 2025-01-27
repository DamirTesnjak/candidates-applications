
import {STORE_REDUCER_NAME} from "@/constants/constants";
import {initialStateCandidate} from "@/lib/features/candidate/candidateSlice";
import EditForm from "@/components/EditForm/EditForm";

export default async function CandidateProfilePage() {
    return <EditForm
        stateModel={initialStateCandidate}
        storeReducerName={STORE_REDUCER_NAME.candidate}
    />
}