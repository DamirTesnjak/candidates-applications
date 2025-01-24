'use client'

import Image from "next/image";
import Link from "next/link";

import {useAppSelector} from "@/lib/hooks";
import {getFile} from "@/utils/getFile";
import {useCallback, useEffect, useState} from "react";
import {getHrUserProfile} from "@/app/_actions/getHrUserProfile";
import SetDataToStore from "@/components/SetDataToStore";
import {DATABASES} from "@/constants/constants";

export default function LoginButton() {
    const [data, setData] = useState(null);
    const profilePicture = useAppSelector((state) => state.hrUser.profilePicture);
    const hrUserId = useAppSelector((state) => state.hrUser.id);

    const getUserProfileData = useCallback(async () => {
        const hrUserInfo = await getHrUserProfile();
        const hrUserInfoParsed = JSON.parse(hrUserInfo);

        const { data } = hrUserInfoParsed;
        setData(data);

    }, [])

    useEffect(() => {
        if (hrUserId.length === 0) {
            getUserProfileData();
        }
    }, [hrUserId, getUserProfileData]);

    return (
        <div>
            <SetDataToStore data={data} databaseName={DATABASES.hrUsers} />
            {hrUserId.length > 0 && (
                <div>
                    <Image
                        id="profilePicture"
                        src={getFile(profilePicture.file)!}
                        width={50}
                        height={50}
                        alt="Loging button"
                    />
                    <Link href={`/hrUserProfile`}>Profile</Link>
                </div>
            )}
            <Link href="/register">Signup</Link>
            <Link href="/login">Login</Link>
        </div>
    )
}