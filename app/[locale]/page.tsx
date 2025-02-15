import { getTranslations } from 'next-intl/server';
import {setRequestLocale} from 'next-intl/server';
import styles from '../homePage.module.scss';

type Props = {
  params: {locale: string};
};

export default async function Home({params: { locale }}: Props) {
  setRequestLocale(locale);

  const translation = await getTranslations("home");
  return <div className={styles.page}>{translation("welcome")}</div>;
}
