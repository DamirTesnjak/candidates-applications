import Link from "next/link";

export default function Sidebar() {
    return (
        <ul>
            <li>
                <Link href="/candidates">Candidates</Link>
                <Link href="/settings">Settings</Link>
                <Link href="/about">About</Link>
            </li>
        </ul>
    )
}