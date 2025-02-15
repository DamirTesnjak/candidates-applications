'use client';

import {useTranslations} from 'next-intl';
import { candidatesColumnDef } from '@/app/[locale]/candidates/customerTableDataProps';
import { emailTemplatesColumnDef } from '@/app/[locale]/settings/overviewEmailTemplateMessages/emailTemplatesTableDataProps';
import Table from '../UI/Table/Table';
import { ICandidateSchema } from '@/utils/dbConfig/models/candidateModel.js';
import { IEmailTemplateSchema } from '@/utils/dbConfig/models/emailTemplateModel';

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

  const translation = useTranslations(page);

  const pageTables: IPageTables = {
    candidates: candidatesColumnDef,
    emailTemplatePage: emailTemplatesColumnDef,
  };

  return (
    <Table
      tableData={tableData}
      columnsToDisplay={columnsToDisplay}
      columnDef={pageTables[page]}
      translation={translation}
    />
  );
}
