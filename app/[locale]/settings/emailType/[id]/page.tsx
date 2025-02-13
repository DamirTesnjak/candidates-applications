import {getTranslations} from 'next-intl/server';
import { updateEmailTemplate } from '@/app/_actions/updateEmailTemplate';
import { getEmailTemplate } from '@/app/_actions/getEmailTemplate';
import TextEditor from '@/components/TextEditor/TextEditor';
import { IParams } from '@/types/params';
import styles from '@/styles/global/globals.module.scss';

export default async function EditEmailTemplateMessage({ params }: IParams) {
  const translation = await getTranslations("setupEmailTemplateMessages");

  const { id } = await params;
  const results = await getEmailTemplate(id);
  const parsedResults = results ? JSON.parse(results) : null;
  const { data } = parsedResults;
  return (
    <div className={styles.container}>
      <h2>{`${translation("editEmailMessageTemplate")}: ${data.emailType}`}</h2>
      <TextEditor data={data} serverAction={updateEmailTemplate} />
    </div>
  );
}
