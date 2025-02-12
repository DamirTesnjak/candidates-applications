import { getTranslations } from 'next-intl/server';
import styles from '../homePage.module.scss';

export default async function Home() {
  const translation = await getTranslations("home");
  return <div className={styles.page}>{translation("home.welcome")}</div>;
}
