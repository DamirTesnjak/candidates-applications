'use client'

import TextEditor from "@/components/TextEditor/TextEditor";
import {createEmailTemplate} from "@/app/_actions/createEmailTemplate";

export default function SetupEmailTemplateMessages(){
    return (
        <div>
            <h2>Create new email message template</h2>
            <form action={createEmailTemplate}>
                <TextEditor />
                <div>
                    <label htmlFor="companyLogo">Upload company logo</label>
                    <input name="companyLogo" type="file"/>
                </div>
                <button type="submit">Save Message</button>
            </form>
        </div>
    )
}