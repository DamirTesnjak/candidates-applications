import {Link} from '@/i18n/routing';
import styles from './sidebar.module.scss';

export interface ISidebarProps {
  sidebarLinks: {
    link: string;
    text: string;
  }[];
}

export default function Sidebar({ sidebarLinks }: ISidebarProps) {
  return (
    <div className={styles.sidebar}>
      {sidebarLinks.map((sidebarLink) => {
        return (
          <div className={styles.menuItem} key={sidebarLink.link}>
            <Link href={sidebarLink.link}>{sidebarLink.text}</Link>
          </div>
        );
      })}
    </div>
  );
}
