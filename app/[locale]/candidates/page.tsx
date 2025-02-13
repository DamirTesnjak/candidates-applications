import { getCandidates } from '@/app/_actions/getCandidates';
import TableComponent from '@/components/TableComponent';
import InfoMessage from '@/components/InfoMessage/InfoMessage';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { PAGES } from '@/constants/constants';
import { PAGES as TPages } from '@/messages/constants/constants';
import { getTranslations } from 'next-intl/server';

export default async function CandidatesPage() {
  const translation = await getTranslations("candidates");
  const results = await getCandidates();
  const parsedResults = JSON.parse(results);

  if (
    parsedResults &&
    parsedResults.candidates &&
    parsedResults.candidates.length > 0
  ) {
    const columnsToDisplay = [
      'profilePicture',
      'name',
      'curriculumVitae',
      'phoneNumber',
      'linkedIn',
      'archived',
      'hired',
      'rejected',
      'button1',
      'button2',
      'button3',
      'button4',
    ];

    return (
      <TableComponent
        tableData={parsedResults.candidates}
        columnsToDisplay={columnsToDisplay}
        page={"candidates"}
      />
    );
  }

  if (
    parsedResults &&
    (!parsedResults.candidates || parsedResults.candidates.length === 0)
  ) {
    return <InfoMessage text={translation("noCandidatesFound")} />;
  }

  if (!results) {
    return <ErrorMessage text={translation("cannotFindAnyCandidates")} />;
  }
}
