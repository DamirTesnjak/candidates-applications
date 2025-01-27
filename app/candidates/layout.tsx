
import Link from "next/link";
import {Button} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import styles from "./candidates.module.scss";

export default async function CandidatesLayout({ children }) {
    return (
        <div className={styles.candidatesPage}>
            <Button
                size="small"
                startIcon={<AddIcon />}
            >
                <Link href={`/candidates/createCandidate`}>Add new candidate</Link>
            </Button>
            <div>
                {children}
            </div>
        </div>
    )
}