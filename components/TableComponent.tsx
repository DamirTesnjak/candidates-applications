'use client';

import {useTranslations} from 'next-intl';
import { usePathname } from '@/i18n/routing';
import { candidatesColumnDef } from '@/app/[locale]/candidates/customerTableDataProps';
import { emailTemplatesColumnDef } from '@/app/[locale]/settings/overviewEmailTemplateMessages/emailTemplatesTableDataProps';
import Table from '../UI/Table/Table';
import { ICandidateSchema } from '@/utils/dbConfig/models/candidateModel.js';
import { IEmailTemplateSchema } from '@/utils/dbConfig/models/emailTemplateModel';
import { useAppSelector } from '@/lib/hooks';

export interface ITableData extends ICandidateSchema, IEmailTemplateSchema {}

export interface ITableComponentProps {
  tableData: ITableData[];
  columnsToDisplay: string[];
  page: 'customerPage' | 'emailTemplatePage' | string;
}

export interface IPageTables {
  [p: string]: typeof candidatesColumnDef | typeof emailTemplatesColumnDef;
}

export default function TableComponent({
  tableData,
  columnsToDisplay,
  page,
}: ITableComponentProps) {
  const location = usePathname();
  const tutorialRunning = useAppSelector((state) => state.tutorialData.tutorialRunning);
  const tutorialTableDataCandidates = useAppSelector((state) => state.tutorialData.mappedCandidates);
  const tutorialDataEmailTemplates =  useAppSelector((state) => state.tutorialData.emailTemplates);
  const translation = useTranslations(page);

  const pageTables: IPageTables = {
    candidates: candidatesColumnDef,
    emailTemplatePage: emailTemplatesColumnDef,
  };

  // if tutorial is running, return tutorialData as tableData
  const replaceTableData = (): ITableData[] => {
    if (tutorialRunning && location === '/candidates') {
      return tutorialTableDataCandidates;
    }
    if (tutorialRunning && location === '/settings/overviewEmailTemplateMessages') {
      return tutorialDataEmailTemplates;
    }
    return tableData;
  }

  return (
    <Table
      tableData={replaceTableData()}
      columnsToDisplay={columnsToDisplay}
      columnDef={pageTables[page]}
      translation={translation}
    />
  );
}
