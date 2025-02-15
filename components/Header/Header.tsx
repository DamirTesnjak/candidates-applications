import { getTranslations } from 'next-intl/server';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ProfileActions from '@/components/Header/ProfileActions/ProfileActions';
import LocaleSwitcher from '@/components/LocaleSwitcher/LocaleSwitcher';
import styles from './header.module.scss';
import TutorialFeature from '@/components/TutorialFeature/TutorialFeature';

export default async function Header() {
  const translation = await getTranslations("header");
  return (
    <header className={styles.header}>
      <div className={styles.appNameDisplay}>
        <span className={styles.appLogo}>
          <SupervisedUserCircleIcon />
        </span>
        <span>
          <span className={styles.appNameFirstPart}>{translation("job")}</span>
          <span className={styles.appNameSecondPart}>{translation("applicants")}</span>
        </span>
      </div>
      <div className={styles.profileActions}>
        <ProfileActions />
        <LocaleSwitcher />
      </div>
    </header>
  );
}
