import { getCandidates } from '@/app/_actions/getCandidates';
import TableComponent from '@/components/TableComponent';
import MessagesDisplay from '@/components/MessagesDisplay/MessagesDisplay';

export default async function CandidatesPage() {
  const results = await getCandidates();
  const parsedResults = JSON.parse(results);

  const columnsToDisplay = [
    'profilePicture',
    'name',
    'curriculumVitae',
    'phoneNumber',
    'linkedIn',
    'archived',
    'hired',
    'rejected',
    'fired',
    'button1',
    'button2',
    'button3',
    'button4',
    'button5',
  ];

  return (
    <div>
      <TableComponent
        tableData={parsedResults.candidates || []}
        columnsToDisplay={columnsToDisplay}
        page={'candidates'}
      />
      <MessagesDisplay
        pageData='candidates'
        page='candidates'
        results={results}
        parsedResults={parsedResults}
      />
    </div>
  );
}
