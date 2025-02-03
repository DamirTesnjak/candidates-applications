import TextEditor from "@/components/TextEditor/TextEditor";
import {updateEmailTemplate} from "@/app/_actions/updateEmailTemplate";
import {getEmailTemplate} from "@/app/_actions/getEmailTemplate";

export default async function EditEmailTemplateMessage({params}){
    const { id } = await params;
    const results = await getEmailTemplate(id);
    const parsedResults = results ? JSON.parse(results) : null;
    const { data } = parsedResults;
    return (
        <div className={styles.container}>
            <h2>Edit email message template</h2>
            <form action={updateEmailTemplate}>
                <TextEditor data={data} />
                <button type="submit">Save Message</button>
            </form>
        </div>
    )
}