
import { getCandidateProfile } from "@/app/_actions/getCandidateProfile";
import Image from "next/image";
import {getFile} from "@/utils/getFile";

export default async function CandidateProfilePage({ params }: { params: { id: string } }) {
    const { id } = await params;
    const { data } = await getCandidateProfile(id);
    console.log(data)


    if (!data) {
        return <div>Could not found profile data</div>
    }

    return (
        <div>
            User Profile
            <div>
                {data && (<div>
                    <Image src={getFile(data.profilePicture.file)!} alt="Profile image" width={200} height={200} />
                    <div>
                        {data.name}
                    </div>
                </div>)}
            </div>

        </div>
    )
}