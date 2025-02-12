import { ReactNode } from 'react';
import {getTranslations} from 'next-intl/server';
import { PAGES as TPages } from '@/messages/constants/constants';
import styles from '@/styles/global/globals.module.scss';

export default async function Layout({ children }: { children: ReactNode }) {
  const translation = await getTranslations(TPages.login);
  return (
    <div className={styles.container}>
      <h3>{translation("login.login")}</h3>
      <div>{children}</div>
    </div>
  );
}
