import {Link} from '@/i18n/routing';
import styles from './sidebar.module.scss';
import { getTranslations } from 'next-intl/server';

export interface ISidebarProps {
  sidebarLinks: {
    link: string;
    text: string;
  }[];
}

export default async function Sidebar({ sidebarLinks }: ISidebarProps) {
  const translation = await getTranslations("sidebar");
  return (
    <div className={styles.sidebar}>
      {sidebarLinks.map((sidebarLink) => {
        return (
          <div id={`sidebar-${sidebarLink.text}`}className={styles.menuItem} key={sidebarLink.link}>
            <Link href={sidebarLink.link}>{translation(sidebarLink.text)}</Link>
          </div>
        );
      })}
    </div>
  );
}
