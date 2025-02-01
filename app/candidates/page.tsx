import {getCandidates} from "@/app/_actions/getCandidates";
import TableComponent from "@/components/TableComponent";
import { PAGES } from "@/constants/constants";

export default async function CandidatesPage() {
    const results = await getCandidates();
    const parsedResults = JSON.parse(results);

    if (parsedResults && parsedResults.candidates && parsedResults.candidates.length > 0) {
        // do not display these columns in table
        const doNotDisplayColumns = [
            "profilePicture.file.name",
            "profilePicture.file.data",
            "profilePicture.file.contentType",
            "contact.address",
            "contact.city",
            "contact.zipCode",
            "contact.country",
            "contact.email",
            "curriculumVitae.file.name",
            "curriculumVitae.file.contentType",
            "_id",
            "__v",
        ]

        // extra columns to add
        const extraAccessorKeys = [
            "profilePicture",
            "button1",
            "button2",
            "button3",
            "button4",
        ]

        return <TableComponent
            data={JSON.parse(results).candidates}
            doNotDisplayColumns={doNotDisplayColumns}
            extraAccessorKeys={extraAccessorKeys}
            page={PAGES.customersPage}
        />;
    }

    if (parsedResults && (!parsedResults.candidates || parsedResults.candidates.length === 0)) {
        return <div>No candidates found.</div>;
    }

    if (!results) {
        return <div>Cannot find any candidates!.</div>;
    }
}