import { ReactNode } from 'react';
import {getTranslations} from 'next-intl/server';
import TabsBar from '@/components/TabsBar/TabsBar';
import { PAGES as TPages } from '@/messages/constants/constants';
import styles from './settings.module.scss';

export default async function SettingsLayout({ children }: { children: ReactNode }) {
  const translation = await getTranslations(TPages.settings);
  const tabsList = [
    {
      url: `/settings/companyEmailConfiguration`,
      text: translation("settings.companyEmailConfiguration"),
    },
    {
      url: `/settings/setupEmailTemplateMessages`,
      text: translation("settings.setupEmailTemplateMessages"),
    },
    {
      url: `/settings/overviewEmailTemplateMessages`,
      text: translation("settings.overviewEmailTemplateMessages"),
    },
    {
      url: `/settings/mapTemplateMessages`,
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
