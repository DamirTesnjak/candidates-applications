import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import ProfileActions from '@/components/Header/ProfileActions/ProfileActions';
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.appNameDisplay}>
        <span className={styles.appLogo}>
          <SupervisedUserCircleIcon />
        </span>
        <span>
          <span className={styles.appNameFirstPart}>Job</span>
          <span className={styles.appNameSecondPart}>Applicants</span>
        </span>
      </div>
      <div className={styles.profileActions}>
        <ProfileActions />
      </div>
    </header>
  );
}
