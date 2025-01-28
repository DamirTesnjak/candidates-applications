import LoginButton from "@/components/Header/LoginButton/LoginButton";
import LogoutButton from "@/components/Header/LogoutButton/LogoutButton";
import styles from './header.module.scss'

export default function Header() {
    return (
        <header className={styles.header}>
            <h1>CANDIDATES OVERWIEV</h1>
            <div className={styles.profile}>
                <LoginButton />
                <LogoutButton />
            </div>
        </header>
    )
}