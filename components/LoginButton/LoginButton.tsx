'use client'

import Button from "../../UI/Button/Button";
import { useState } from "react";
import {DATABASES} from "@/constants/constants";
import SetDataToStore from "@/components/SetDataToStore/SetDataToStore";
import {initialStateHrUser} from "@/lib/features/hrUser/hrUserSlice";
import {loginHrUser} from "@/app/_actions/loginHrUser";

export default function LoginButton() {
    const [ success, setSuccess ] = useState<boolean>(false);

    const handleLogin = async () => {
        const result = await loginHrUser(formData);
        setSuccess(JSON.parse(result).success);
    }

    return (
        <div>
            <Button className="submitButton" type='submit' text="Login" onClick={() => handleLogin()}/>
            {success && <SetDataToStore data={initialStateHrUser} databaseName={DATABASES.hrUsers} />}
        </div>
    )
}