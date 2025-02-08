'use client'

import { useState, useTransition } from 'react';
import Modal from "@/components/Modal/Modal";
import {DATABASES} from "@/constants/constants";
import {deleteProfileInfo} from "@/app/_actions/deleteProfileInfo";
import Button from "@/UI/Button/Button";
import DeleteIcon from '@mui/icons-material/Delete';
import { useAppDispatch } from '@/lib/hooks';
import { initialStateHrUser, loadUpdateHrUser } from '@/lib/features/hrUser/hrUserSlice';
import { loadUpdateCandidate } from '@/lib/features/candidate/candidateSlice';
import { useRouter } from 'next/navigation'

export default function DeleteProfileButton({id, databaseName}: {id: string; databaseName: string}) {
    const router = useRouter()
    const dispatch = useAppDispatch();
    const [, startTransition] = useTransition();
    const [deleteProfile, setDeleteProfile] = useState(false);

    const submitAction = async (formData: FormData) => {
        startTransition(async () => {
            const result = await deleteProfileInfo(formData);
            const {success} = result;
            if (success) {
                if (DATABASES.candidates === DATABASES[databaseName]) {
                    dispatch(loadUpdateCandidate(initialStateHrUser));
                    router.push('/candidates');
                }

                if (DATABASES.hrUsers === DATABASES[databaseName]) {
                    dispatch(loadUpdateHrUser(initialStateHrUser));
                    router.push('/register');

                }
                setDeleteProfile(false);
            }
        })
    }

    const modalContent = (
        <div style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
        }}>
            <div>
                Do you want to delete this profile? The action cannot be undone!
            </div>
            <div style={{
                display: "flex",
                flexDirection: "row",
                gap: 12,
                justifyContent: "center",
            }}>
                <form onSubmit={async (e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    await submitAction(formData);
                }}>
                    <input hidden={true} name="id" defaultValue={id}/>
                    <input hidden={true} name="databaseName" defaultValue={DATABASES[databaseName]}/>
                    <Button
                        className="submitButton"
                        text="Yes! Delete profile!"
                        type="submit"
                    />
                </form>
                <Button
                    className="button"
                    text="Cancel"
                    onClick={() => setDeleteProfile(false)}
                    type="button"
                />
            </div>
        </div>
    )

    return (
        <div>
            <Button
                className="deleteButton"
                text="Delete"
                onClick={() => setDeleteProfile(true)}
                startIcon={<DeleteIcon />}
                type="button"
            />
            {deleteProfile && (<Modal type="warning" content={modalContent}/>)}
        </div>
    )
}