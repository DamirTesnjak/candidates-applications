import TextEditor from "@/components/TextEditor/TextEditor";
import {updateEmailTemplate} from "@/app/_actions/updateEmailTemplate";
import {getEmailTemplate} from "@/app/_actions/getEmailTemplate";
import styles from "@/styles/global/globals.module.scss";


export default async function EditEmailTemplateMessage({params}){
    const { id } = await params;
    const results = await getEmailTemplate(id);
    const parsedResults = results ? JSON.parse(results) : null;
    const { data } = parsedResults;
    return (
        <div className={styles.container}>
            <h2>{`Edit email message template: ${data.emailType}`}</h2>
            <form action={updateEmailTemplate}>
                <TextEditor data={data} />
            </form>
        </div>
    )
}