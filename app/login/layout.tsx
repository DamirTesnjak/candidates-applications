import styles from "@/styles/global/globals.module.scss";

export default function Layout({ children }) {
    return <div className={styles.container}>
        <h3>Login</h3>
        <div>
            {children}
        </div>
    </div>
}