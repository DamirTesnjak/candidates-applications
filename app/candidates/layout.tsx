
import Link from "next/link";

export default async function CandidatesLayout({ children }) {

    return (
        <div>
            <nav>
                <ul>
                    <li>
                        <Link href={`/candidates/createCandidate`}>Add new candidate</Link>
                    </li>
                </ul>
            </nav>
            <div>
                {children}
            </div>

        </div>
    )
}