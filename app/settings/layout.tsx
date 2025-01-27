import Link from "next/link";
import styles from './settings.module.scss';

export default function SettingsLayout({children}) {
    return (
        <div className={styles.settingsPage}>
            <ul>
                <li><Link href="/settings/companyEmailConfiguration">Company Email Configuration</Link></li>
                <li><Link href="/settings/setupEmailTemplateMessages">Configure Email Template Messages</Link></li>
                <li><Link href="/settings/overviewEmailTemplateMessages">Overview Email Template Messages</Link></li>
            </ul>
            {children}
        </div>
)
}