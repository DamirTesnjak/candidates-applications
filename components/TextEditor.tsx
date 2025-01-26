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

export default function TextEditor() {
    const [textAreaText, setTextAreaText] = useState({
        manualEditing: true,
        text: candidateCongratulationEmailJobPosition
    });
    const [selectedEmailTemplate, setEmailTemplate] = useState({
        manualEditing: false,
        selectedCategory:"candidateHired"
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
                    defaultValue="Hello World"
                    variant="standard"
                    size="small"
                    focused={true}
                />
            </div>
            <label htmlFor="messageText">Message text as HTML markup</label>
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
                Italic
            </Button>
            <Button
                variant="outlined"
                startIcon={<FormatBoldIcon />}
                onClick={() => onButtonTextEditorClick("strong")
                }>
                Bold
            </Button>
            <Button
                variant="outlined"
                startIcon={<FormatUnderlinedIcon />}
                onClick={() => onButtonTextEditorClick("underline")
                }>
                Underline
            </Button>
            <Button
                variant="outlined"
                startIcon={<KeyboardReturnIcon />}
                onClick={() => onButtonTextEditorClick("newLine")
                }>
                newLine
            </Button>
            <Button
                variant="outlined"
                startIcon={<LinkIcon />}
                onClick={() => onButtonTextEditorClick("link")
                }>
                link
            </Button>
            <Button
                variant="outlined"
                startIcon={<SuperscriptIcon />}
                onClick={() => onButtonTextEditorClick("superscript")
                }>
                Superscript
            </Button>
            <Button
                variant="outlined"
                startIcon={<SubscriptIcon />}
                onClick={() => onButtonTextEditorClick("subscript")
                }>
                Subscript
            </Button>
            <div>
                <Button
                    variant="outlined"
                    startIcon={<PersonIcon />}
                    onClick={() => onButtonTextEditorClick("candidateNameTemplate")
                    }>
                    Candidate Name Template
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<AccountBoxIcon />}
                    onClick={() => onButtonTextEditorClick("hrUserFullNameTemplate")
                    }>
                    HR User Full Name Template
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<WorkIcon />}
                    onClick={() => onButtonTextEditorClick("jobTitleTemplate")
                    }>
                    Job Title Template
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<BusinessIcon />}
                    onClick={() => onButtonTextEditorClick("companyNameTemplate")
                    }>
                    Company Name Template
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<EventIcon />}
                    onClick={() => onButtonTextEditorClick("currentYearTemplate")
                    }>
                    Current Year Template
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<CalendarMonthIcon />}
                    onClick={() => onButtonTextEditorClick("startDateTemplate")
                    }>
                    Start Date Template
                </Button>
            </div>
            <div>
                <SelectInput
                    value={selectedEmailTemplate.selectedCategory}
                    handleChange={handleChangeOnSelectEmailTemplate}
                    inputComponent={<Input />}
                    placeholder="Select email template"
                    listDropdown={selectDropdownEmailList}
                />
            </div>
            <div>
                <textarea id="editor" name="messageText" cols={50} rows={10} onInput={changeWhenTyping} value={textAreaText.text}/>
            </div>
            <div id="preview"></div>
        </div>
    )
}