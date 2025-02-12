import { ReactNode } from 'react';
import styles from '@/styles/global/globals.module.scss';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className={styles.container}>
      <h3>{translation("login.login")}</h3>
      <div>{children}</div>
    </div>
  );
}
