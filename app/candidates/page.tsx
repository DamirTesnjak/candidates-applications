import {getCandidates} from "@/app/_actions/getCandidates";
import Link from "next/link";

export default async function CandidatesPage() {
    const results = await getCandidates();

    if (results && results.candidates && results.candidates.length > 0) {
        const candidates = results.candidates;
        return  candidates.map((candidate) => {
            return <div key={candidate.id}>
                    <div id="name">{candidate.name}</div>
                    <div id="name">{candidate.surname}</div>
                    <div id="archived">{candidate.status.archived}</div>
                    <div id="employed">{candidate.status.employed}</div>
                    <div id="rejected">{candidate.status.rejected}</div>
                    <Link href={`/candidateProfile/${candidate._id}`} target="_blank" prefetch>Link to profile</Link>
                </div>
            });
    }

    if (results && (!results.candidates || results.candidates.length === 0)) {
        return <div>No candidates found.</div>;
    }

    if (!results) {
        return <div>Cannot find any candidates!.</div>;
    }
}