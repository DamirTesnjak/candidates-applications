'use client'

import {loginHrUser} from "@/app/_actions/loginHrUser";
import Input from "@/UI/Input/Input";
import styles from "@/components/EditForm/editForm.module.scss";
import Button from "@/UI/Button/Button";
import { useTransition } from 'react';
import {getHrUserProfile} from "@/app/_actions/getHrUserProfile";
import {useAppDispatch} from "@/lib/hooks";
import {loadUpdateHrUser} from "@/lib/features/hrUser/hrUserSlice";
import { useRouter } from 'next/navigation';

export default function LogingPage() {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const [isPending, startTransition] = useTransition();

    const inputFields = [
        { name: "username", type: "text", label: "Username" },
        { name: "password", type: "password", label: "Password" },
    ];

    const submitAction = async (formData) => {
        startTransition(async () => {
            const result = await loginHrUser(formData);
            const parsedResult = JSON.parse(result);
            const {success} = parsedResult;
            if (success) {
                const result = await getHrUserProfile();
                const parsedResult = JSON.parse(result);
                const {data} = parsedResult;
                dispatch(loadUpdateHrUser(data));
                router.push('/candidates');
            }
        })
    }

    const formContent = inputFields.map((inputField) => {
        return (
            <div key={inputField.name}>
                <Input
                    className="standard"
                    name={inputField.name}
                    label={inputField.label}
                    type={inputField.type}
                    flow="flowRow"
                />
            </div>
        )
    })

    return (
        <div>
            <form
                onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    await submitAction(formData);
                }}>
                { formContent }
                <div className={styles.buttonsContainer}>
                    <Button
                        className="submitButton"
                        type="submit"
                        text="Login"
                    />
                </div>
            </form>
        </div>
    )
}