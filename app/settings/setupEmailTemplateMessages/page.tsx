import TextEditor from "@/components/TextEditor/TextEditor";
import {createEmailTemplate} from "@/app/_actions/createEmailTemplate";
import styles from './setupEmail.templates.module.scss'
import Button from "@/UI/Button/Button";

export default function SetupEmailTemplateMessages(){
    return (
        <div className={styles.container}>
            <h3>CONFIGURE EMAIL TEMPLATE MESSAGE</h3>
            <form action={createEmailTemplate}>
                <TextEditor />
            </form>
        </div>
    )
}