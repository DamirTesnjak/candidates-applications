import { EDIT_TEXT_BUTTON } from "@/constants/constants";
import {useEffect, useState, useMemo} from "react";
import addHTMLTags from "@/utils/addHTMLTags";
import {Button, TextField} from "@mui/material";
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
import InputFileUpload from "@/components/InputFileUpload/InputFileUpload";

import styles from './textEditor.module.scss';

export default function TextEditor({ data }) {
    const [textAreaText, setTextAreaText] = useState({
        manualEditing: true,
        text: data?.emailText || candidateCongratulationEmailJobPosition
    });
    const [selectedEmailTemplate, setEmailTemplate] = useState({
        manualEditing: false,
        selectedCategory: data?.emailType || "candidateHired"
    });

    const preDefinedEmailTemplates = useMemo(() => ({
        candidateHired: candidateCongratulationEmailJobPosition,
        candidateRejected: candidateRejectionEmailJobPosition,
        employeeFired: candidateEmailFiredFromJobPosition,
    }), []);

    const selectDropdownEmailList = [
        { id: 'candidateHired', value: "candidateHired"},
        { id: 'candidateRejected', value: "candidateRejected"},
        { id: 'employeeFired', value: "employeeFired"},
    ]

    const handleChangeOnSelectEmailTemplate = (event: SelectChangeEvent<typeof value>) => {
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
        const editorElement = document.getElementById("editor")!;
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
        <div>
            <div className={styles.selectionSaveToolbar}>
                <TextField
                    required={true}
                    id="outlined-required"
                    label="Email Type"
                    variant="standard"
                    size="small"
                    focused={true}
                    placeholder="Hire, reject, fire..."
                />
                <SelectInput
                    label="Email Template"
                    value={selectedEmailTemplate.selectedCategory}
                    handleChange={handleChangeOnSelectEmailTemplate}
                    placeholder="Select email template"
                    listDropdown={selectDropdownEmailList}
                />
                <InputFileUpload className={styles.ordinaryButton} text="Upload company logo"/>
                <Button className={styles.submitButton} variant="contained" type="submit">Save Message</Button>
            </div>
            <div className={styles.toolbar}>
                <Button
                    className={styles.textButton}
                    startIcon={<Paragraph />}
                    onClick={() => onButtonTextEditorClick("paragraph")
                }>
                </Button>
                <Button
                    className={styles.textButton}
                    startIcon={<FormatItalicIcon />}
                    onClick={() => onButtonTextEditorClick("italic")
                    }>
                </Button>
                <Button
                    className={styles.textButton}
                    startIcon={<FormatBoldIcon />}
                    onClick={() => onButtonTextEditorClick("strong")
                    }>
                </Button>
                <Button
                    className={styles.textButton}
                    startIcon={<FormatUnderlinedIcon />}
                    onClick={() => onButtonTextEditorClick("underline")
                    }>
                </Button>
                <Button
                    className={styles.textButton}
                    startIcon={<KeyboardReturnIcon />}
                    onClick={() => onButtonTextEditorClick("newLine")
                    }>
                </Button>
                <Button
                    className={styles.textButton}
                    startIcon={<LinkIcon />}
                    onClick={() => onButtonTextEditorClick("link")
                    }>
                </Button>
                <Button
                    className={styles.textButton}
                    startIcon={<SuperscriptIcon />}
                    onClick={() => onButtonTextEditorClick("superscript")
                    }>
                </Button>
                <Button
                    className={styles.textButton}
                    startIcon={<SubscriptIcon />}
                    onClick={() => onButtonTextEditorClick("subscript")
                    }>
                </Button>
                <Button
                    className={styles.textButton}
                    startIcon={<PersonIcon />}
                    onClick={() => onButtonTextEditorClick("targetPersonFullName")
                    }>
                    Candidate Name
                </Button>
                <Button
                    className={styles.textButton}
                    startIcon={<AccountBoxIcon />}
                    onClick={() => onButtonTextEditorClick("hrUserFullNameTemplate")
                    }>
                    Your Name
                </Button>
                <Button
                    className={styles.textButton}
                    startIcon={<WorkIcon />}
                    onClick={() => onButtonTextEditorClick("jobTitleTemplate")
                    }>
                    Candidate Job Title
                </Button>
                <Button
                    className={styles.textButton}
                    startIcon={<WorkIcon />}
                    onClick={() => onButtonTextEditorClick("jobTitleTemplate")
                }>
                    Your Job Title
                </Button>
                <Button
                    className={styles.textButton}
                    startIcon={<BusinessIcon />}
                    onClick={() => onButtonTextEditorClick("companyNameTemplate")
                    }>
                    Company Name
                </Button>
                <Button
                    className={styles.textButton}
                    startIcon={<EventIcon />}
                    onClick={() => onButtonTextEditorClick("currentDateTemplate")
                    }>
                    Current Date
                </Button>
                <Button
                    className={styles.textButton}
                    startIcon={<CalendarMonthIcon />}
                    onClick={() => onButtonTextEditorClick("startDateTemplate")
                    }>
                    Start Date
                </Button>
            </div>
            <div className={styles.textAreaDisplay}>
                <textarea className={styles.textarea} id="editor" name="messageText" cols={50} rows={10} onInput={changeWhenTyping} value={textAreaText.text}/>
                <div id="preview" className={styles.preview}/>
            </div>
        </div>
    )
}