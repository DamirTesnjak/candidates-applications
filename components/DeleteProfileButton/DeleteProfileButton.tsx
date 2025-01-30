'use client'

import {useState} from "react";
import Modal from "@/components/Modal/Modal";
import {DATABASES} from "@/constants/constants";
import {deleteProfileInfo} from "@/app/_actions/deleteProfileInfo";
import Button from "@/UI/Button/Button";
import AddIcon from "@mui/icons-material/Add";

export default function DeleteProfileButton({id, databaseName}: {id: string; databaseName: string}) {
    const [deleteProfile, setDeleteProfile] = useState(false);

    return (
        <div>
            <button onClick={() => setDeleteProfile(true)}>Delete Profile</button>
            {deleteProfile && (<Modal>
                Do you want to delete this profile?
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
            </Modal>)}
        </div>
    )
}