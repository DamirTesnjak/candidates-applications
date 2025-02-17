import { ReactNode } from 'react';
import globalStyles from '@/styles/global/globals.module.scss';

export default async function HelpLayout({ children }: { children: ReactNode }) {
  return (
    <div className={globalStyles.container}>
      {children}
    </div>
  );
}
