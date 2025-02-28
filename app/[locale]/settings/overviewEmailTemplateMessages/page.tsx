import { getTranslations } from 'next-intl/server';
import { getEmailTemplates } from '@/app/_actions/getEmailTemplates';
import TableComponent from '@/components/TableComponent';
import MessagesDisplay from '@/components/MessagesDisplay/MessagesDisplay';
import styles from '@/styles/global/globals.module.scss';

export default async function overviewEmailTemplateMessages() {
  const translation = await getTranslations('emailTemplatePage');
  const results = await getEmailTemplates();
  const parsedResults = JSON.parse(results);

  const columnsToDisplay = ['emailType', 'button1', 'button2'];

  return (
    <div className={styles.container}>
      <h3>{translation('emailTemplates')}</h3>
      <TableComponent
        tableData={parsedResults.emailTemplates || []}
        columnsToDisplay={columnsToDisplay}
        page='emailTemplatePage'
      />
      <MessagesDisplay
        pageData='emailTemplates'
        page='emailTemplatePage'
        results={results}
        parsedResults={parsedResults}
      />
    </div>
  );
}
