'use client'

import styles from "../../../styles/global/globals.module.scss"
import Button from "@/UI/Button/Button";
import SelectInput from "@/UI/SelectInput/SelectInput";
import {getEmailTemplates} from "@/app/_actions/getEmailTemplates";
import {mapEmailTemplates} from "@/app/_actions/mapEmailTemplates";
import {useCallback, useState, useTransition, useEffect} from "react";

export default function MappedEmailsConfigurationPage() {
    const [isPending, startTransition] = useTransition();
    const [emailTemplates, setEmailTemplates] = useState([]);

    const getMapEmailTemplates = useCallback(async () => {
        const emailTemplatesData = await getEmailTemplates();
        console.log("emailTemplatesData", emailTemplatesData);
        setEmailTemplates(JSON.parse(emailTemplatesData).emailTemplates);
    }, []);

    useEffect(() => {
        if (emailTemplates.length === 0) {
            getMapEmailTemplates();
        }
    }, [emailTemplates.length, getMapEmailTemplates])


    const selectDropdownEmailList = emailTemplates?.map((emailTemplate) => ({
        id: emailTemplate.emailType, value: emailTemplate.emailType,
    })) || [];

    const submitAction = async (formData) => {
        startTransition(async () => {
            await mapEmailTemplates(formData);
        })
    }

    return (
        <div className={styles.container}>
            <h3>Map email template messages</h3>
            <form onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                await submitAction(formData);
            }}>
                <SelectInput
                    label="Archive"
                    listDropdown={selectDropdownEmailList}
                    placeholder="Select email Template"
                    name="archive"
                />
                <SelectInput
                    label="Hire"
                    listDropdown={selectDropdownEmailList}
                    placeholder="Select email Template"
                    name="hire"
                />
                <SelectInput
                    label="Reject"
                    listDropdown={selectDropdownEmailList}
                    placeholder="Select email Template"
                    name="reject"
                />
                <Button
                    className="submitButton"
                    type="submit"
                    text="Save Changes"
                />
            </form>
        </div>
    )
}