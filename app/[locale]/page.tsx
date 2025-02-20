import { getTranslations } from 'next-intl/server';
import {setRequestLocale} from 'next-intl/server';
import styles from '@/styles/global/globals.module.scss';
import { Link } from '@/i18n/routing';
import Button from '@/UI/Button/Button';

export default async function Home({ params }: {  params: { locale: string } }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const translation = await getTranslations("home");
  return <div className={styles.container}>
    <h2>{`${translation("welcome")}`}</h2>
    <div dangerouslySetInnerHTML={{__html: translation.raw('welcomeText')}} />
    <br/>
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      width: '200px',
      justifyContent: 'flex-start'
    }}>
      <Link href={`/register`}>
        <Button
          className='primaryTextButton'
          type='button'
          text={translation('profileActionsRegister')}
        />
      </Link>
      <Link href={`/login`}>
        <Button
          className='primaryTextButton'
          type='button'
          text={translation('profileActionsLogin')}
        />
      </Link>
    </div>
  </div>
}
