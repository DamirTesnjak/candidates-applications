import Link from "next/link";
import {getEmailTemplates} from "@/app/_actions/getEmailTemplates";
import {deleteEmailTemplate} from "@/app/_actions/deleteEmailTemplate";

export default async function overviewEmailTemplateMessages() {
    const results = await getEmailTemplates();

    if (results && results.emailTemplates && results.emailTemplates.length > 0) {
        const emailTemplates = results.emailTemplates;
        return  emailTemplates.map((emailTemplate) => {
            return <div key={emailTemplate.id}>
                <div id="name">{emailTemplate.emailType}</div>
                <Link href={`/settings/emailType/${emailTemplate._id}`} prefetch>edit</Link>
                <form action={deleteEmailTemplate}>
                    <button type="submit">Delete</button>
                </form>
            </div>
        });
    }

    if (results && (!results.emailTemplates || results.emailTemplates.length === 0)) {
        return <div>No email templates found.</div>;
    }

    if (!results) {
        return <div>Cannot find any email templates!.</div>;
    }
}