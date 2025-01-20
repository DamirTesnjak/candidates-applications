import {getHrUserProfile} from "@/app/_actions/getHrUserProfile";
import DisplayHrUserInfo from "@/components/DisplayHrUserInfo";

export default async function UserProfilePage() {
    const hrUserInfo = await getHrUserProfile()

    return (
        <div>
            User Profile
            <div>
                <DisplayHrUserInfo hrUserInfo={JSON.stringify(hrUserInfo)} />
            </div>

        </div>
    )
}