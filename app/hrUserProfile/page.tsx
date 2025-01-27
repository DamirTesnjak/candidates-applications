import {initialStateHrUser} from "@/lib/features/hrUser/hrUserSlice";
import {STORE_REDUCER_NAME} from "@/constants/constants";
import EditForm from "@/components/EditForm/EditForm";

export default async function UserProfilePage() {
    return <EditForm
        stateModel={initialStateHrUser}
        storeReducerName={STORE_REDUCER_NAME.hrUser}
    />
}