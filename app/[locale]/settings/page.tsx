
import { getTranslations } from 'next-intl/server';
import { PAGES as TPages } from '@/messages/constants/constants';
import styles from '../../../styles/global/globals.module.scss';

export default async function SettingsPage(){
const translation = await getTranslations(TPages.settings);

  return (
    <div className={styles.container}>
      <h3>{translation("settings.settings")}</h3>
      Test
    </div>
  );
}
