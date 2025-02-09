import SetDataToStore from "@/components/SetDataToStore/SetDataToStore";
import {DATABASES} from "@/constants/constants";
import {getHrUserProfile} from "@/app/_actions/getHrUserProfile";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";

export default async function WrapperSetDataToStore() {
    const results = await getHrUserProfile();
    const parsedResults = results ? JSON.parse(results) : null;
    const { data } = parsedResults;

    if (!data) {
        return <ErrorMessage text="Could not find profile data" />;
    }
    return (
        <SetDataToStore data={data} databaseName={DATABASES.hrUsers} />
    )
}