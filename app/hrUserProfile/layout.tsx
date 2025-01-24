
import Image from "next/image";
import {getFile} from "@/utils/getFile";
import {DATABASES} from "@/constants/constants";
import DeleteProfileButton from "@/components/DeleteProfileButton";
import SetDataToStore from "@/components/SetDataToStore";
import Link from "next/link";
import {getHrUserProfile} from "@/app/_actions/getHrUserProfile";

export default async function CandidateProfileLayout({ children, params }: { params: { id: string } }) {
    const { id } = await params;
    const results = await getHrUserProfile();
    const parsedResults = results ? JSON.parse(results) : null;
    const { data } = parsedResults;

    console.log('id', id);

    console.log('data', data);

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
                        <Link href={`/hrUserProfile/editHrUserProfile`}>Edit profile</Link>
                    </li>
                    <li>
                        <DeleteProfileButton id={data.id} databaseName={DATABASES.hrUsers} />
                    </li>
                </ul>
            </nav>
            <div>
                <SetDataToStore data={data} databaseName={DATABASES.hrUsers} />
                {children}
            </div>

        </div>
    )
}