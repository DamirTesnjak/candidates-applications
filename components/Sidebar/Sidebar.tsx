import Link from "next/link";
import styles from './sidebar.module.scss'

export default function Sidebar({sidebarLinks}) {
    return (
        <div className={styles.sidebar}>
                {sidebarLinks.map((sidebarLink) => {
                return <div className={styles.menuItem}  key={sidebarLink.link}>
                    <Link href={sidebarLink.link}>{sidebarLink.text}</Link>
                </div>
            })}
        </div>
    )
}