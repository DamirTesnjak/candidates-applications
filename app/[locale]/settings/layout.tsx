import { ReactNode } from 'react';
import {getTranslations} from 'next-intl/server';
import TabsBar from '@/components/TabsBar/TabsBar';
import styles from './settings.module.scss';

export default async function SettingsLayout({ children }: { children: ReactNode }) {
  const translation = await getTranslations("settings");
  const tabsList = [
    {
      id: "companyEmailConfiguration",
      url: `/settings/companyEmailConfiguration`,
      text: translation("companyEmailConfiguration"),
    },
    {
      id: "setupEmailTemplateMessages",
      url: `/settings/setupEmailTemplateMessages`,
      text: translation("setupEmailTemplateMessages"),
    },
    {
      id: "overviewEmailTemplateMessages",
      url: `/settings/overviewEmailTemplateMessages`,
      text: translation("overviewEmailTemplateMessages"),
    },
    {
      id: "mapEmailTemplateMessages",
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
