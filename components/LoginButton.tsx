'use client'

import Image from "next/image";
import Link from "next/link";

import {useAppSelector} from "@/lib/hooks";
import {getFile} from "@/utils/getFile";

export default function LoginButton() {
    const profilePicture = useAppSelector((state) => state.hrUser.profilePicture);
    const hrUserId = useAppSelector((state) => state.hrUser.id);
    return (
        <div>
            {hrUserId.length > 0 && (
                <div>
                    <Image
                        id="profilePicture"
                        src={getFile(profilePicture.file)!}
                        width={50}
                        height={50}
                        alt="Loging button"
                    />
                    <Link href={`/hrUserProfile/${hrUserId}`}>Profile</Link>
                </div>
            )}
            <Link href="/register">Signup</Link>
            <Link href="/login">Login</Link>
        </div>
    )
}