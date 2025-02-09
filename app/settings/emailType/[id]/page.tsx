import TextEditor from "@/components/TextEditor/TextEditor";
import {getEmailTemplate} from "@/app/_actions/getEmailTemplate";
import styles from "@/styles/global/globals.module.scss";
import { IParams } from '@/types/params';
import { updateEmailTemplate } from '@/app/_actions/updateEmailTemplate';

export default async function EditEmailTemplateMessage({params}: IParams){
    const { id } = await params;
    const results = await getEmailTemplate(id);
    const parsedResults = results ? JSON.parse(results) : null;
    const { data } = parsedResults;
    return (
        <div className={styles.container}>
            <h2>{`Edit email message template: ${data.emailType}`}</h2>
            <TextEditor data={data} serverAction={updateEmailTemplate}/>
        </div>
    )
}