import styles from "@/styles/global/globals.module.scss";

export default function RegisterLayout({ children }) {
    return <div className={styles.container}>
        <h3>Register</h3>
        <div>
            {children}
        </div>
    </div>
}