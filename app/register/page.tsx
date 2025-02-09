'use client'

import { createHrUser } from "@/app/_actions/createHrUser";
import Input from "@/UI/Input/Input";
import styles from "@/components/EditForm/editForm.module.scss";
import Button from "@/UI/Button/Button";
import {useActionState, useState, useEffect} from "react";
import Modal from "@/components/Modal/Modal";
import ModalContentMessage from '@/components/Modal/ModalContentMessage/ModalContent';
import { IShowModal } from '@/types/ShowModalType';

export default function RegisterPage() {
    const inputFields = [
        { name: "name", type: "text", label: "Name" },
        { name: "surname", type: "text", label: "Surname" },
        { name: "companyName", type: "text", label: "Company" },
        { name: "phoneNumber", type: "text", label: "Phone Number" },
        { name: "email", type: "email", label: "Email" },
        { name: "username", type: "text", label: "Username" },
        { name: "password", type: "password", label: "Password" },
    ];

    const [ response, formAction ] = useActionState(createHrUser, null);
    const [ showModal, setShowModal ] = useState<IShowModal>({
        success: false,
        error: false,
    });

    useEffect(() => {
        if (response && (response.error || response.success)) {
            setShowModal({
                success: response.success,
                error: response.error,
            });
        }
    }, [response]);

    const formContent = inputFields.map((inputField) => {
        return (
            <Input
                key={inputField.name}
                className="standard"
                name={inputField.name}
                label={inputField.label}
                type={inputField.type}
                flow="flowRow"
                errorMessage={response && response.errorFieldValidation ? response.errorFieldValidation[inputField.name] : null}
                defaultValue={response && response.error && response.prevState ? response.prevState[inputField.name] : ""}
            />
        )
    })

    return (
        <div>
            <form action={formAction}>
                { formContent }
                <div className={styles.buttonsContainer}>
                    <Input
                        className="uploadButton"
                        flow="flowRow"
                        label="Profile picture"
                        name="profilePicture"
                        type="file"
                    />
                    <Button
                        className="submitButton"
                        type="submit"
                        text="Save Changes"
                    />
                </div>
            </form>
            {showModal.error && (<Modal type="error" content={<ModalContentMessage response={response} setShowModal={setShowModal} />}/>)}
            {showModal.success && (<Modal type="success" content={<ModalContentMessage response={response} setShowModal={setShowModal} />}/>)}
        </div>
    )
}