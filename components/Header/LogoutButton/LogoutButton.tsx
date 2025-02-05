'use client'

import {logoutHrUser} from "@/app/_actions/logoutHrUser";
import Button from "../../../UI/Button/Button";
import { useState } from "react";
import {DATABASES} from "@/constants/constants";
import SetDataToStore from "@/components/SetDataToStore/SetDataToStore";
import {initialStateHrUser} from "@/lib/features/hrUser/hrUserSlice";

export default function LogoutButton() {
    const [ success, setSuccess ] = useState<boolean>(false);

    const handleLogout = async () => {
        const result = await logoutHrUser();
        setSuccess(result.success);
    }

    return (
        <div>
            <Button className="submitButton" type='submit' text="Logout" onClick={() => handleLogout()}/>
            {success && <SetDataToStore data={initialStateHrUser} databaseName={DATABASES.hrUsers} />}
        </div>
    )
}