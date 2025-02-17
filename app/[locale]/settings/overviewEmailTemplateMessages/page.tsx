import {getTranslations} from 'next-intl/server';
import { getEmailTemplates } from '@/app/_actions/getEmailTemplates';
import InfoMessage from '@/components/InfoMessage/InfoMessage';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import TableComponent from '@/components/TableComponent';
import styles from '@/styles/global/globals.module.scss';

export default async function overviewEmailTemplateMessages() {
  const translation = await getTranslations("emailTemplatePage");
  const results = await getEmailTemplates();
  const parsedResults = JSON.parse(results);

  if (
    parsedResults &&
    parsedResults.emailTemplates &&
    parsedResults.emailTemplates.length > 0
  ) {
    const columnsToDisplay = ['emailType', 'button1', 'button2'];

    return (
      <div id="container" className={styles.container}>
        <h3>{translation("emailTemplates")}</h3>
        <TableComponent
          tableData={parsedResults.emailTemplates}
          columnsToDisplay={columnsToDisplay}
          page="emailTemplatePage"
        />
      </div>
    );
  }

  if (
    parsedResults &&
    (!parsedResults.emailTemplates || parsedResults.emailTemplates.length === 0)
  ) {
    return (
      <div id="container" className={styles.container}>
        <InfoMessage text={translation("noEmailTemplatesFound")} />
      </div>
    );
  }

  if (!results) {
    return (
      <div id="container" className={styles.container}>
        <ErrorMessage text={translation("cannotFindAnyEmailTemplates")} />
      </div>
    );
  }
}
