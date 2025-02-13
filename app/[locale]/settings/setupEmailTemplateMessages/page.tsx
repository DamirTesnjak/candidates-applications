import {getTranslations} from 'next-intl/server';
import TextEditor from '@/components/TextEditor/TextEditor';
import { createEmailTemplate } from '@/app/_actions/createEmailTemplate';
import { PAGES as TPages } from '@/messages/constants/constants';
import styles from '../../../../styles/global/globals.module.scss';

export default async function SetupEmailTemplateMessages() {
  const translation = await getTranslations(TPages.setupEmailTemplateMessages);

  return (
    <div className={styles.container}>
      <h3>{translation("configureTemplateMessage")}</h3>
      <TextEditor serverAction={createEmailTemplate} />
    </div>
  );
}
