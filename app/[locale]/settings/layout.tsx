import { ReactNode } from 'react';
import {getTranslations} from 'next-intl/server';
import TabsBar from '@/components/TabsBar/TabsBar';
import styles from './settings.module.scss';

export default async function SettingsLayout({ children }: { children: ReactNode }) {
  const translation = await getTranslations("settings");
  const tabsList = [
    {
      url: `/settings/companyEmailConfiguration`,
      text: translation("companyEmailConfiguration"),
    },
    {
      url: `/settings/setupEmailTemplateMessages`,
      text: translation("setupEmailTemplateMessages"),
    },
    {
      url: `/settings/overviewEmailTemplateMessages`,
      text: translation("overviewEmailTemplateMessages"),
    },
    {
      url: `/settings/mapTemplateMessages`,
      text: translation("mapEmailTemplateMessages"),
    },
  ];
  return (
    <div className={styles.page}>
      <TabsBar tabList={tabsList} />
      {children}
    </div>
  );
}
