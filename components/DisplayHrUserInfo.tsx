'use client'

import Image from "next/image";
import {getFile} from "@/utils/getFile";
import {useCallback, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "@/lib/hooks";
import {getHrUserProfile} from "@/app/_actions/getHrUserProfile";
import {loadHrUser} from "@/lib/features/hrUser/hrUserSlice";

export default function DisplayHrUserInfo() {
    const dispatch = useAppDispatch();

    const getUserProfileData = useCallback(async () => {
        const hrUserInfo = await getHrUserProfile();
        const hrUserInfoParsed = JSON.parse(hrUserInfo);

        const { data, error } = hrUserInfoParsed;

        dispatch(loadHrUser(data));
    }, [dispatch])

    const profilePicture = useAppSelector(state => state.hrUser.profilePicture);
    const image = getFile(profilePicture.file)!;
    const hrUserId = useAppSelector((state) => state.hrUser.id);
    console.log('hrUserId', hrUserId);

    console.log(hrUserId);

    useEffect(() => {
        if (hrUserId.length === 0) {
            getUserProfileData();
        }
    }, [hrUserId, getUserProfileData]);

    return (
        <div>
            {
                hrUserId.length > 0 ? (<div>User Profile
                    <Image src={image} alt="Profile image" width={200} height={200} />
                    <div>
                        {hrUserId}
                    </div>
                </div>) : null}
        </div>
    )
}