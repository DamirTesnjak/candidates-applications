import LoginButton from "@/components/Header/LoginButton/LoginButton";
import LogoutButton from "@/components/Header/LogoutButton/LogoutButton";
import styles from '../../styles/header/header.module.scss'

export default function Header() {
    return (
        <header className={styles.header}>
            <h2>CANDIDATES OVERWIEV</h2>
            <div className={styles.profile}>
                <LoginButton />
                <LogoutButton />
            </div>
        </header>
    )
}