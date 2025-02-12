import { ReactNode } from 'react';
import TabsBar from '@/components/TabsBar/TabsBar';
import styles from './settings.module.scss';

export default function SettingsLayout({ children }: { children: ReactNode }) {
  const tabsList = [
    {
      url: `${locale}/settings/companyEmailConfiguration`,
      text: translation("settings.companyEmailConfiguration"),
    },
    {
      url: `${locale}/settings/setupEmailTemplateMessages`,
      text: translation("settings.setupEmailTemplateMessages"),
    },
    {
      url: `${locale}/settings/overviewEmailTemplateMessages`,
      text: translation("settings.overviewEmailTemplateMessages"),
    },
    {
      url: `${locale}/settings/mapTemplateMessages`,
      text: translation("settings.mapEmailTemplateMessage"),
    },
  ];
  return (
    <div className={styles.page}>
      <TabsBar tabList={tabsList} />
      {children}
    </div>
  );
}
