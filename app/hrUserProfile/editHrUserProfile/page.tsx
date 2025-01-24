import EditForm from "@/components/EditForm";
import {STORE_REDUCER_NAME} from "@/constants/constants";
import {initialStateHrUser} from "@/lib/features/hrUser/hrUserSlice";
import {updateHrUser} from "@/app/_actions/updateHrUser";

export default function EditHrUserPage() {
    return (
        <EditForm
            serverAction={updateHrUser}
            stateModel={initialStateHrUser}
            storeReducerName={STORE_REDUCER_NAME.hrUser}
        />
    )
}