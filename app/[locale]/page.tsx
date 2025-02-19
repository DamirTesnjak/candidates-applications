import { getTranslations } from 'next-intl/server';
import {setRequestLocale} from 'next-intl/server';
import styles from '@/styles/global/globals.module.scss';

export default async function Home({ params }: {  params: { locale: string } }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const translation = await getTranslations("home");
  return <div className={styles.container}>
    <h2>{`${translation("welcome")}`}</h2>
    <div dangerouslySetInnerHTML={{__html: translation.raw('welcomeText')}} />
    </div>
}
