
import Link from "next/link";
import AddIcon from '@mui/icons-material/Add';
import styles from "../../styles/global/globals.module.scss"
import Button from "@/UI/Button/Button";
import { ReactNode } from 'react';

export default async function CandidatesLayout({ children }: { children: ReactNode; }) {
    return (
        <div className={styles.container}>
            <h3>Candidates</h3>
            <Link href={`/candidates/createCandidate`}>
                <Button
                    className="button"
                    text="Add new candidate"
                    startIcon={<AddIcon />}
                    type="button"
                />
            </Link>
            <div>
                {children}
            </div>
        </div>
    )
}