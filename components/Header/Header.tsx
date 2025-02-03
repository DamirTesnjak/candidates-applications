import LoginButton from "@/components/Header/LoginButton/LoginButton";
import LogoutButton from "@/components/Header/LogoutButton/LogoutButton";
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import styles from './header.module.scss'

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.appNameDisplay}>
                <span className={styles.appLogo}><SupervisedUserCircleIcon/></span>
                <span>
                    <span className={styles.appNameFirstPart}>Job</span>
                    <span className={styles.appNameSecondPart}>Applicants</span>
                </span>
            </div>
            <div className={styles.profile}>
                <LoginButton />
                <LogoutButton />
            </div>
        </header>
    )
}