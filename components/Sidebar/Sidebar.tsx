import Link from "next/link";
import styles from './sidebar.module.scss';
import { ISidebarProps } from '@/types/SidebarProps';

export default function Sidebar({sidebarLinks}: ISidebarProps) {
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