import styles from '@/styles/global/globals.module.scss';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function HelpPage() {

  const translation = await getTranslations("help");

  return (<div className={styles.container}>
    <h2>{`${translation("help")}`}</h2>
    <article>
      <h4>Candidates table</h4>
      <Image src="" alt="table image"/>
      <br/>
      <br/>
      <h4>Email templates table</h4>
      <Image src="" alt="table image"/>
    </article>
  </div>
  );
}
