
import { getCandidateProfile } from "@/app/_actions/getCandidateProfile";
import Image from "next/image";
import {getFile} from "@/utils/getFile";
import {DATABASES} from "@/constants/constants";
import DeleteProfileButton from "@/components/DeleteProfileButton";
import SetDataToStore from "@/components/SetDataToStore";
import Link from "next/link";

export default async function CandidateProfileLayout({ children, params }: { params: { id: string } }) {
    const { id } = await params;
    const results = await getCandidateProfile(id);
    const parsedResults = results ? JSON.parse(results) : null;
    const { data } = parsedResults

    console.log(results)

    if (!data) {
        return <div>Could not found profile data</div>
    }

    return (
        <div>
            <h1>{`${data.name} ${data.surname}`}</h1>
            <Image src={getFile(data.profilePicture.file)!} alt="Profile image" width={200} height={200} />
            <nav>
                <ul>
                    <li>
                        <Link href={`/candidateProfile/${id}/editCandidate`}>Edit profile</Link>
                    </li>
                    <li>
                        <DeleteProfileButton id={id} databaseName={DATABASES.candidates} />
                    </li>
                </ul>
            </nav>
            <div>
                <SetDataToStore data={data} databaseName={DATABASES.candidates} />
                {children}
            </div>

        </div>
    )
}