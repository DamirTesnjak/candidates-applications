import {Link} from '@/i18n/routing';
import styles from './tabsBar.module.scss';

export default function TabsBar({
  tabList,
}: {
  tabList: {id: string, url: string; text: string }[];
}) {
  return (
    <div className={styles.tabsBarContainer}>
      {tabList.map((tabItem) => {
        return (
          <Link id={tabItem.id} className={styles.tabItem} href={tabItem.url} key={tabItem.url}>
            {tabItem.text}
          </Link>
        );
      })}
    </div>
  );
}
