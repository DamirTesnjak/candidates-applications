
import { getCandidateProfile } from "@/app/_actions/getCandidateProfile";
import Image from "next/image";
import {getFile} from "@/utils/getFile";
import {DATABASES} from "@/constants/constants";
import DeleteProfileButton from "@/components/DeleteProfileButton/DeleteProfileButton";
import SetDataToStore from "@/components/SetDataToStore/SetDataToStore";
import Link from "next/link";
import globalStyles from "../../../styles/global/globals.module.scss"
import styles from "../candidateProfile.module.scss";
import Button from "@/UI/Button/Button";
import AddIcon from "@mui/icons-material/Add";

export default async function CandidateProfileLayout({ children, params }: { params: { id: string } }) {
    const { id } = await params;
    const results = await getCandidateProfile(id);
    const parsedResults = results ? JSON.parse(results) : null;
    const { data } = parsedResults

    if (!data) {
        return <div>Could not found profile data</div>
    }

    return (
        <div className={globalStyles.container}>
            <SetDataToStore data={data} databaseName={DATABASES.candidates} />
            <div className={styles.candidateProfilePage}>
                <h3 className={styles.pageTitle}>{`Candidate profile: ${data.name} ${data.surname}`}</h3>
                <div className={styles.profilePicture}>
                    <div id="profilePicture">
                        <Image src={getFile(data.profilePicture.file)!} alt="Profile image" width={200} height={200} />
                        <ul>
                            <li>
                                <Link href={`/candidateProfile/${id}/editCandidate`}>
                                    <Button
                                        className="button"
                                        text="Edit profile"
                                        startIcon={<AddIcon />}
                                        type="button"
                                    />
                                </Link>
                            </li>
                            <li>
                                <DeleteProfileButton id={id} databaseName={DATABASES.candidates} />
                            </li>
                        </ul>
                    </div>
                </div>
                {children}
            </div>
        </div>
    )
}