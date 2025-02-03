'use client'

import {useState} from "react";
import Modal from "@/components/Modal/Modal";
import {DATABASES} from "@/constants/constants";
import {deleteProfileInfo} from "@/app/_actions/deleteProfileInfo";
import Button from "@/UI/Button/Button";
import DeleteIcon from '@mui/icons-material/Delete';

export default function DeleteProfileButton({id, databaseName}: {id: string; databaseName: string}) {
    const [deleteProfile, setDeleteProfile] = useState(false);

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
                <form action={deleteProfileInfo}>
                    <input hidden={true} name="id" defaultValue={id}/>
                    <input hidden={true} name="databaseName" defaultValue={DATABASES[databaseName]}/>
                    <Button
                        className="submitButton"
                        text="Yes! Delete profile!"
                        onClick={() => setDeleteProfile(false)}
                        type="button"
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