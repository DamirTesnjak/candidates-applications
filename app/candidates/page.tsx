import {getCandidates} from "@/app/_actions/getCandidates";
import TableComponent from "@/components/TableComponent";
import { PAGES } from "@/constants/constants";
import InfoMessage from '@/components/InfoMessage/InfoMessage';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';

export default async function CandidatesPage() {
    const results = await getCandidates();
    const parsedResults = JSON.parse(results);

    if (parsedResults && parsedResults.candidates && parsedResults.candidates.length > 0) {
        const columnsToDisplay = [
            "profilePicture",
            "name",
            "curriculumVitae",
            "phoneNumber",
            "linkedIn",
            "archived",
            "hired",
            "rejected",
            "button1",
            "button2",
            "button3",
            "button4",
        ]

        return <TableComponent
            data={JSON.parse(results).candidates}
            columnsToDisplay={columnsToDisplay}
            page={PAGES.customersPage}
        />;
    }

    if (parsedResults && (!parsedResults.candidates || parsedResults.candidates.length === 0)) {
        return <InfoMessage text="No candidates found" />
    }

    if (!results) {
      return <ErrorMessage text="Cannot find any candidates!" />
    }
}