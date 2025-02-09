import styles from "@/styles/global/globals.module.scss";
import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
    return <div className={styles.container}>
        <h3>Login</h3>
        <div>
            {children}
        </div>
    </div>
}