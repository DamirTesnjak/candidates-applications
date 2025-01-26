import Link from "next/link";

export default function SettingsLayout({children}) {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link href="/settings/companyEmailConfiguration">Company Email Configuration</Link></li>
                    <li><Link href="/settings/setupEmailTemplateMessages">Configure Email Template Messages</Link></li>
                    <li><Link href="/settings/overviewEmailTemplateMessages">Overview Email Template Messages</Link></li>
                </ul>
            </nav>
            {children}
        </div>
)
}