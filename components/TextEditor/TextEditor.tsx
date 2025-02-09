'use client'

import { EDIT_TEXT_BUTTON } from "@/constants/constants";
import {useEffect, useState, useMemo} from "react";
import addHTMLTags from "@/utils/addHTMLTags";
import Paragraph from '@mui/icons-material/LocalParking';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import LinkIcon from '@mui/icons-material/Link';
import SuperscriptIcon from '@mui/icons-material/Superscript';
import SubscriptIcon from '@mui/icons-material/Subscript';
import PersonIcon from '@mui/icons-material/Person';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import EventIcon from '@mui/icons-material/Event';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import {candidateCongratulationEmailJobPosition} from "@/utils/emailMessagesTemplates/messageCandidateSelected";
import {candidateRejectionEmailJobPosition} from "@/utils/emailMessagesTemplates/messageCandidateRejected";
import {candidateEmailFiredFromJobPosition} from "@/utils/emailMessagesTemplates/messageEmployeeGotFired";
import SelectInput from "@/UI/SelectInput/SelectInput";
import {SelectChangeEvent} from "@mui/material/Select";
import Button from "@/UI/Button/Button";
import Input from "@/UI/Input/Input";

import styles from './textEditor.module.scss';

export interface ITextEditorProps {
  data?: {
    emailText: string;
    emailType: string;
  };
}

export default function TextEditor({ data }: ITextEditorProps) {
    const [textAreaText, setTextAreaText] = useState({
        manualEditing: true,
        text: data?.emailText || candidateCongratulationEmailJobPosition
    });
    const [,setEmailTemplate] = useState({
        manualEditing: false,
        selectedCategory: data?.emailType || "candidateHired"
    });

    const preDefinedEmailTemplates: {
        [x: string]: string;
        candidateHired: string;
        candidateRejected: string;
        employeeFired: string;
    } = useMemo(() => ({
        candidateHired: candidateCongratulationEmailJobPosition,
        candidateRejected: candidateRejectionEmailJobPosition,
        employeeFired: candidateEmailFiredFromJobPosition,
    }), []);

    const selectDropdownEmailList = [
        { id: 'candidateHired', value: "candidateHired"},
        { id: 'candidateRejected', value: "candidateRejected"},
        { id: 'employeeFired', value: "employeeFired"},
    ]

    const handleChangeOnSelectEmailTemplate = (event: SelectChangeEvent) => {
        const previewElement = document.getElementById("preview");
        if (previewElement) {
            previewElement.innerHTML = preDefinedEmailTemplates[event.target.value];
            setEmailTemplate({
                manualEditing: false,
                selectedCategory: event.target.value,
            });
            setTextAreaText({
                manualEditing: false,
                text: preDefinedEmailTemplates[event.target.value],
            })
        }
    };

    const changeWhenTyping = () => {
        const editorElement = document.getElementById("editor")! as HTMLInputElement;
        const previewElement = document.getElementById("preview")!;
            previewElement.innerHTML = editorElement.value;
            setTextAreaText({
                manualEditing: true,
                text: editorElement.value,
            });
    }

    const onButtonTextEditorClick = (button: string) => {
        const editTextButtonsKeys = Object.keys(EDIT_TEXT_BUTTON);
        console.log(editTextButtonsKeys);

        for (const key of editTextButtonsKeys) {
            if (button === key) {
                const textAreaElementWithChangedInnerHTMl = addHTMLTags({
                    startTag: EDIT_TEXT_BUTTON[button].startTag,
                    endTag: EDIT_TEXT_BUTTON[button].endTag,
                    textAreaElementId: "editor",
                })
                const previewElement = document.getElementById("preview")!;
                previewElement.innerHTML = textAreaElementWithChangedInnerHTMl.value;
                setTextAreaText({
                    manualEditing: true,
                    text: textAreaElementWithChangedInnerHTMl.value,
                });
            }
        }
    }

    useEffect(() => {
        const previewElement = document.getElementById("preview");
        if (previewElement?.innerHTML.length === 0) {
            previewElement.innerHTML = textAreaText.text;
        }
    }, [textAreaText]);

    return (
        <div className={styles.paper}>
            <div className={styles.selectionSaveToolbar}>
                <Input
                    className="standard"
                    flow="flowColumn"
                    label="Email Template name"
                    name="emailType"
                    type="text"
                />
                <SelectInput
                    label="Email Template"
                    onSelect={handleChangeOnSelectEmailTemplate}
                    listDropdown={selectDropdownEmailList}
                    placeholder="Select email Template"
                />
                <div className={styles.buttonsContainer}>
                    <Input className="uploadButton" flow="flowRow" type="file" label="Upload company logo" name="companyLogo" />
                    <Button
                        className="submitButton"
                        type="submit"
                        text="Save Changes"
                    />
                </div>
            </div>
            <div className={styles.toolbar}>
                <Button
                    className="textButton"
                    startIcon={<Paragraph />}
                    type="button"
                    onClick={() => onButtonTextEditorClick("paragraph")}
                />
                <Button
                    className="textButton"
                    startIcon={<FormatItalicIcon />}
                    type="button"
                    onClick={() => onButtonTextEditorClick("italic")}
                />
                <Button
                    className="textButton"
                    startIcon={<FormatBoldIcon />}
                    type="button"
                    onClick={() => onButtonTextEditorClick("strong")}
                />
                <Button
                    className="textButton"
                    startIcon={<FormatUnderlinedIcon />}
                    type="button"
                    onClick={() => onButtonTextEditorClick("underline")}
                />
                <Button
                    className="textButton"
                    startIcon={<KeyboardReturnIcon />}
                    type="button"
                    onClick={() => onButtonTextEditorClick("newLine")}
                />
                <Button
                    className="textButton"
                    startIcon={<LinkIcon />}
                    type="button"
                    onClick={() => onButtonTextEditorClick("link")}
                />
                <Button
                    className="textButton"
                    startIcon={<SuperscriptIcon />}
                    type="button"
                    onClick={() => onButtonTextEditorClick("superscript")}
                />
                <Button
                    className="textButton"
                    startIcon={<SubscriptIcon />}
                    type="button"
                    onClick={() => onButtonTextEditorClick("subscript")}
                />
                <Button
                    className="textButton"
                    startIcon={<PersonIcon />}
                    type="button"
                    onClick={() => onButtonTextEditorClick("targetPersonFullName")}
                    text="Candidate name"
                />
                <Button
                    className="textButton"
                    startIcon={<AccountBoxIcon />}
                    type="button"
                    onClick={() => onButtonTextEditorClick("hrUserFullNameTemplate")}
                    text="Your Name"
                />
                <Button
                    className="textButton"
                    startIcon={<WorkIcon />}
                    type="button"
                    onClick={() => onButtonTextEditorClick("jobTitleTemplate")}
                    text="Candidate Job Position"
                />
                <Button
                    className="textButton"
                    startIcon={<WorkIcon />}
                    type="button"
                    onClick={() => onButtonTextEditorClick("jobTitleTemplate")}
                    text="Your Job Title"
                />
                <Button
                    className="textButton"
                    startIcon={<BusinessIcon />}
                    type="button"
                    onClick={() => onButtonTextEditorClick("companyNameTemplate")}
                    text="Company Name"
                />
                <Button
                    className="textButton"
                    startIcon={<EventIcon />}
                    type="button"
                    onClick={() => onButtonTextEditorClick("currentDateTemplate")}
                    text="Current Date"
                />
                <Button
                    className="textButton"
                    startIcon={<CalendarMonthIcon />}
                    type="button"
                    onClick={() => onButtonTextEditorClick("startDateTemplate")}
                    text="Start Date"
                />
            </div>
            <div className={styles.textAreaDisplay}>
                <textarea className={styles.textarea} id="editor" name="emailText" cols={50} rows={10} onInput={changeWhenTyping} value={textAreaText.text}/>
                <div id="preview" className={styles.preview}/>
            </div>
        </div>
    )
}