
import Image from "next/image";
import {getFile} from "@/utils/getFile";
import {DATABASES} from "@/constants/constants";
import DeleteProfileButton from "@/components/DeleteProfileButton/DeleteProfileButton";
import SetDataToStore from "@/components/SetDataToStore/SetDataToStore";
import Link from "next/link";
import {getHrUserProfile} from "@/app/_actions/getHrUserProfile";
import styles from "./hrUserProfile.module.scss";
import Button from "@/UI/Button/Button";
import AddIcon from "@mui/icons-material/Add";
import globalStyles from "@/styles/global/globals.module.scss";
import ErrorMessage from "@/components/ErrorMessage/ErrorMessage";
import LogoutButton from "@/components/Header/LogoutButton/LogoutButton";

export default async function CandidateProfileLayout({ children }: { params: { id: string } }) {
    const results = await getHrUserProfile();
    const parsedResults = results ? JSON.parse(results) : null;
    const { data } = parsedResults;

    if (!data) {
        return <ErrorMessage text="Could not find profile data" />;
    }

    return (
        <div className={globalStyles.container}>
            <SetDataToStore data={data} databaseName={DATABASES.hrUsers} />
            <div className={styles.hrProfilePage}>
                <div className={styles.logoutContainer}>
                    <h3>{`Profile: ${data.name} ${data.surname}`}</h3>
                    <LogoutButton />
                </div>
                <div className={styles.profilePicture}>
                    <div id="profilePicture">
                        <Image src={getFile(data.profilePicture.file)!} alt="Profile image" width={200} height={200} />
                        <div className={styles.buttonsContainer}>
                            <Link href={`/hrUserProfile/editHrUserProfile`}>
                                <Button
                                    className="button"
                                    text="Edit profile"
                                    startIcon={<AddIcon />}
                                    type="button"
                                />
                            </Link>
                            <DeleteProfileButton id={data.id} databaseName={DATABASES.hrUsers} />
                        </div>
                    </div>
                </div>
                {children}
            </div>

        </div>
    )
}