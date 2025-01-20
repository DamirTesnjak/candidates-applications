'use client'

import Image from "next/image";
import {getFile} from "@/utils/getFile";
import {useEffect} from "react";

export default function DisplayHrUserInfo({ hrUserInfo }: { hrUserInfo: string }) {
    const data = JSON.parse(hrUserInfo)
    console.log(data)
    const image = getFile(data.data.profilePicture.file)!

    useEffect(() => {}, [data]);
    return (
        <div>
            {
                data && (<div>User Profile
                    <Image src={image} alt="Profile image" width={200} height={200} />
                    <div>
                        {data.data.name}
                    </div>
                </div>)}
        </div>
    )
}