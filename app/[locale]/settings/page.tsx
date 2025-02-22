
import { getTranslations } from 'next-intl/server';
import styles from '../../../styles/global/globals.module.scss';

export default async function SettingsPage(){
const translation = await getTranslations("settings");

  return (
    <div className={styles.container}>
      <h3>{translation("settings")}</h3>
      {translation("settingsText")}
    </div>
  );
}
