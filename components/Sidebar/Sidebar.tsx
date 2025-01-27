import Link from "next/link";
import styles from './sidebar.module.scss'

export default function Sidebar({sidebarLinks}) {
    return (
        <div className={styles.sidebar}>
            <ul>
                {sidebarLinks.map((sidebarLink) => {
                    return <li key={sidebarLink.link}>
                        <Link href={sidebarLink.link}>{sidebarLink.text}</Link>
                    </li>
                })}
            </ul>
        </div>
    )
}