import {getCandidates} from "@/app/_actions/getCandidates";
import Link from "next/link";
import styles from './candidates.module.scss';
import {Button } from "@mui/material";
import Table from "@/UI/Table/Table";


export default async function CandidatesPage() {
    const results = await getCandidates();
    const parsedResults = JSON.parse(results);

    if (parsedResults && parsedResults.candidates && parsedResults.candidates.length > 0) {
        return <Table data={JSON.parse(results).candidates} />;
        /*return  <div>{ candidates.map((candidate) => {
            return (
                <div className={styles.candidate}  key={candidate.id}>
                    <div id="name">{candidate.name}</div>
                    <div id="name">{candidate.surname}</div>
                    <div id="archived">{candidate.status.archived ? "Archived" : ""}</div>
                    <div id="employed">{candidate.status.employed ? "Employed" : ""}</div>
                    <div id="rejected">{candidate.status.rejected ? "Rejected" : ""}</div>
                    <div id="archiveButton"><form><Button>Archive</Button></form></div>
                    <div id="employButton"><form><Button>Employ</Button></form></div>
                    <div id="rejectedButton"><form><Button>Reject</Button></form></div>
                    <Link href={`/candidateProfile/${candidate._id}`} prefetch>See candidate</Link>
               </div>
            )})}
        </div>;*/
    }

    if (parsedResults && (!parsedResults.candidates || parsedResults.candidates.length === 0)) {
        return <div>No candidates found.</div>;
    }

    if (!results) {
        return <div>Cannot find any candidates!.</div>;
    }
}