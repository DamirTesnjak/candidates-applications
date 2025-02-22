'use client'

import InfoMessage from '@/components/InfoMessage/InfoMessage';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import { useAppSelector } from '@/lib/hooks';
import { ITableData } from '@/components/TableComponent';
import { useTranslations } from 'next-intl';

export default function MessagesDisplay({ page,pageData, parsedResults, results }: {
  page: string;
  pageData: string;
  parsedResults: {
    [x: string]: ITableData[];
  };
  results: string;
}) {
  const translation = useTranslations<string>(page);
  const tutorialRunning = useAppSelector((state) => state.tutorialData.tutorialRunning);

  const displayMessage = () => {
    if (
        parsedResults &&
        (!parsedResults[pageData] || parsedResults[pageData].length === 0)
      ) {
        return <InfoMessage text={translation(page === "candidates" ? "noCandidatesFound" : "noEmailTemplatesFound")} />;
      }

      if (!results) {
        return <ErrorMessage text={translation(page === "candidates" ? "cannotFindAnyCandidates" : "cannotFindAnyEmailTemplates")} />;
      }
  }

  return (
    <div>
      { !tutorialRunning ? displayMessage() : null }
    </div>
  )
}