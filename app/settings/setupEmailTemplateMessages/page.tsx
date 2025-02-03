import TextEditor from "@/components/TextEditor/TextEditor";
import {createEmailTemplate} from "@/app/_actions/createEmailTemplate";
import styles from '../../../styles/global/globals.module.scss';

export default function SetupEmailTemplateMessages(){
    return (
        <div className={styles.container}>
            <h3>Configure template message</h3>
            <form action={createEmailTemplate}>
                <TextEditor />
            </form>
        </div>
    )
}