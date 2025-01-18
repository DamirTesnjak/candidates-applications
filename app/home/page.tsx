import Link from 'next/link';

export default function HomePage() {
    return (
        <div>
            <div>
                Welcome!
                To use this application please register or login with your credentials
            </div>
            <Link href="/register">
                Register
            </Link>
            <Link href="/login">
                Login
            </Link>
        </div>
    )
}