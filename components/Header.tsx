import LoginButton from "@/components/LoginButton";
import LogoutButton from "@/components/LogoutButton";

export default function Header() {
    return (
        <header>
            <nav>
                <h2>CANDIDATES OVERWIEV</h2>
                <LoginButton />
                <LogoutButton />
            </nav>
        </header>
    )
}