import { ReactNode } from 'react';
import {getTranslations} from 'next-intl/server';
import { PAGES as TPages } from '@/messages/constants/constants';
import styles from '@/styles/global/globals.module.scss';

export default async function RegisterLayout({ children }: { children: ReactNode }) {
  const translation = await getTranslations(TPages.register);
  return (
    <div className={styles.container}>
      <h3>{translation("register.register")}</h3>
      <div>{children}</div>
    </div>
  );
}
