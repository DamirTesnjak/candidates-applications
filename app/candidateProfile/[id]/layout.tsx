
import { getCandidateProfile } from "@/app/_actions/getCandidateProfile";
import Image from "next/image";
import {getFile} from "@/utils/getFile";
import {DATABASES} from "@/constants/constants";
import DeleteProfileButton from "@/components/DeleteProfileButton/DeleteProfileButton";
import SetDataToStore from "@/components/SetDataToStore/SetDataToStore";
import Link from "next/link";
import styles from "../candidateProfile.module.scss"

export default async function CandidateProfileLayout({ children, params }: { params: { id: string } }) {
    const { id } = await params;
    const results = await getCandidateProfile(id);
    const parsedResults = results ? JSON.parse(results) : null;
    const { data } = parsedResults

    if (!data) {
        return <div>Could not found profile data</div>
    }

    return (
        <div className={styles.candidateProfilePage}>
            <SetDataToStore data={data} databaseName={DATABASES.candidates} />
            <h1 className={styles.pageTitle}>{`Candidate profile: ${data.name} ${data.surname}`}</h1>
            <div className={styles.profilePicture}>
                <div id="profilePicture">
                    <Image src={getFile(data.profilePicture.file)!} alt="Profile image" width={200} height={200} />
                    <ul>
                        <li>
                            <Link href={`/candidateProfile/${id}/editCandidate`}>Edit profile</Link>
                        </li>
                        <li>
                            <DeleteProfileButton id={id} databaseName={DATABASES.candidates} />
                        </li>
                    </ul>
                </div>
            </div>
            <div className={styles.profileForm}>
                {children}
            </div>

        </div>
    )
}