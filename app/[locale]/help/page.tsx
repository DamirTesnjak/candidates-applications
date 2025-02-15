import styles from '@/styles/global/globals.module.scss';
import { getTranslations } from 'next-intl/server';

export default async function HelpPage() {
  const translation = await getTranslations("help");

  return (<div className={styles.container}>
    <h2>{`${translation("help")}`}</h2>
    <article>
      Welcome to the JobApplicants app. With this application you will be able to maintain the list of your employees at your company.
      <br/>
      You will be able to maintain the list of candidates applying to your published job posts on different social media.
      <br/>
      This app will help you to create email templates that you can then send later to your employees or candidates by a clicking a single button
      <br/>
      For more information how to use this app go to the Help section.
      <br/>
      <br/>
      You must login with your company credentials to start using the app.
    </article>
  </div>
  );
}
