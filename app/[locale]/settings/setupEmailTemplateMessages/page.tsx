import TextEditor from '@/components/TextEditor/TextEditor';
import { createEmailTemplate } from '@/app/_actions/createEmailTemplate';
import styles from '../../../../styles/global/globals.module.scss';

export default function SetupEmailTemplateMessages() {
  return (
    <div className={styles.container}>
      <h3>{translation("settings.setupEmailTemplateMessages.configureTemplateMessage")}</h3>
      <TextEditor serverAction={createEmailTemplate} />
    </div>
  );
}
