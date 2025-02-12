import {getTranslations} from 'next-intl/server';
import { getEmailTemplates } from '@/app/_actions/getEmailTemplates';
import InfoMessage from '@/components/InfoMessage/InfoMessage';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import TableComponent from '@/components/TableComponent';
import { PAGES } from '@/constants/constants';
import { PAGES as TPages } from '@/messages/constants/constants';
import styles from '@/styles/global/globals.module.scss';

export default async function overviewEmailTemplateMessages() {
  const translation = await getTranslations(TPages.overviewEmailTemplateMessages);
  const results = await getEmailTemplates();
  const parsedResults = JSON.parse(results);

  if (
    parsedResults &&
    parsedResults.emailTemplates &&
    parsedResults.emailTemplates.length > 0
  ) {
    const columnsToDisplay = ['emailType', 'button1', 'button2'];

    return (
      <div className={styles.container}>
        <h3>Email Templates</h3>
        <TableComponent
          tableData={parsedResults.emailTemplates}
          columnsToDisplay={columnsToDisplay}
          page={PAGES.emailTemplatePage}
        />
      </div>
    );
  }

  if (
    parsedResults &&
    (!parsedResults.emailTemplates || parsedResults.emailTemplates.length === 0)
  ) {
    return (
      <div className={styles.container}>
        <InfoMessage text={translation("settings.overviewEmailTemplateMessages.noEmailTemplatesFound")} />
      </div>
    );
  }

  if (!results) {
    return (
      <div className={styles.container}>
        <ErrorMessage text={translation("settings.overviewEmailTemplateMessages.cannotFindAnyEmailTemplates")} />
      </div>
    );
  }
}
