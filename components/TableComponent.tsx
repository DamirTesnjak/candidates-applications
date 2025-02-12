'use client';

import { candidatesColumnDef } from '@/app/candidates/customerTableDataProps';
import { emailTemplatesColumnDef } from '@/app/settings/overviewEmailTemplateMessages/emailTemplatesTableDataProps';
import Table from '../UI/Table/Table';
import { ICandidateSchema } from '@/utils/dbConfig/models/candidateModel.js';
import { IEmailTemplateSchema } from '@/utils/dbConfig/models/emailTemplateModel';
import { PAGES } from '@/constants/constants';

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
  const pageTables: IPageTables = {
    [PAGES.customersPage]: candidatesColumnDef,
    [PAGES.emailTemplatePage]: emailTemplatesColumnDef,
  };

  return (
    <Table
      tableData={tableData}
      columnsToDisplay={columnsToDisplay}
      columnDef={pageTables[page]}
    />
  );
}
