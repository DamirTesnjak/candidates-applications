import styles from '../homePage.module.scss';

export default function Home() {
  return <div className={styles.page}>{translation("home.welcome")}</div>;
}
