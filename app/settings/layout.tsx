import { ReactNode } from 'react';
import TabsBar from '@/components/TabsBar/TabsBar';
import styles from './settings.module.scss';

export default function SettingsLayout({ children }: { children: ReactNode }) {
  const tabsList = [
    {
      url: '/settings/companyEmailConfiguration',
      text: 'Company Email Configuration',
    },
    {
      url: '/settings/setupEmailTemplateMessages',
      text: 'Configure Email Template Messages',
    },
    {
      url: '/settings/overviewEmailTemplateMessages',
      text: 'Overview Email Template Messages',
    },
    {
      url: '/settings/mapTemplateMessages',
      text: 'Map Email Template Messages',
    },
  ];
  return (
    <div className={styles.page}>
      <TabsBar tabList={tabsList} />
      {children}
    </div>
  );
}
