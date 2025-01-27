import { EDIT_TEXT_BUTTON } from "@/constants/constants";
import {useEffect, useState, useMemo} from "react";
import addHTMLTags from "@/utils/addHTMLTags";
import {Button, Input, TextField} from "@mui/material";
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
            <div>
                <TextField
                    required={true}
                    id="outlined-required"
                    label="Email Type"
                    variant="standard"
                    size="small"
                    focused={true}
                    placeholder="Hire, reject, fire..."
                />
            </div>
            <label htmlFor="messageText">Insert</label>
            <Button
                variant="outlined"
                startIcon={<Paragraph />}
                onClick={() => onButtonTextEditorClick("paragraph")
            }>
                Paragraph
            </Button>
            <Button
                variant="outlined"
                startIcon={<FormatItalicIcon />}
                onClick={() => onButtonTextEditorClick("italic")
                }>
            </Button>
            <Button
                variant="outlined"
                startIcon={<FormatBoldIcon />}
                onClick={() => onButtonTextEditorClick("strong")
                }>
            </Button>
            <Button
                variant="outlined"
                startIcon={<FormatUnderlinedIcon />}
                onClick={() => onButtonTextEditorClick("underline")
                }>
            </Button>
            <Button
                variant="outlined"
                startIcon={<KeyboardReturnIcon />}
                onClick={() => onButtonTextEditorClick("newLine")
                }>
            </Button>
            <Button
                variant="outlined"
                startIcon={<LinkIcon />}
                onClick={() => onButtonTextEditorClick("link")
                }>
            </Button>
            <Button
                variant="outlined"
                startIcon={<SuperscriptIcon />}
                onClick={() => onButtonTextEditorClick("superscript")
                }>
            </Button>
            <Button
                variant="outlined"
                startIcon={<SubscriptIcon />}
                onClick={() => onButtonTextEditorClick("subscript")
                }>
            </Button>
                <Button
                    variant="outlined"
                    startIcon={<PersonIcon />}
                    onClick={() => onButtonTextEditorClick("targetPersonFullName")
                    }>
                    Candidate Name
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<AccountBoxIcon />}
                    onClick={() => onButtonTextEditorClick("hrUserFullNameTemplate")
                    }>
                    HR Name
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<WorkIcon />}
                    onClick={() => onButtonTextEditorClick("jobTitleTemplate")
                    }>
                    Job Title
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<BusinessIcon />}
                    onClick={() => onButtonTextEditorClick("companyNameTemplate")
                    }>
                    Company Name
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<EventIcon />}
                    onClick={() => onButtonTextEditorClick("currentYearTemplate")
                    }>
                    Year
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<CalendarMonthIcon />}
                    onClick={() => onButtonTextEditorClick("startDateTemplate")
                    }>
                    Start Date
                </Button>
            <div>
                <span>Email template:</span>
                <SelectInput
                    value={selectedEmailTemplate.selectedCategory}
                    handleChange={handleChangeOnSelectEmailTemplate}
                    inputComponent={<Input />}
                    placeholder="Select email template"
                    listDropdown={selectDropdownEmailList}
                />
            </div>
            <div className={styles.textAreaDisplay}>
                <div>
                    <textarea className={styles.textarea} id="editor" name="messageText" cols={50} rows={10} onInput={changeWhenTyping} value={textAreaText.text}/>
                </div>
                <div id="preview" className={styles.preview}/>
            </div>
        </div>
    )
}