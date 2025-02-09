'use client'

import { customerTableDataProps } from '@/app/candidates/customerTableDataProps';
import { emailTemplatesTableDataProps } from "@/app/settings/overviewEmailTemplateMessages/emailTemplatesTableDataProps";
import Table from "../UI/Table/Table";
import {PAGES} from "@/constants/constants";
import { ICandidateSchema } from '@/utils/dbConfig/models/candidateModel.js';
import { MRT_RowData } from 'material-react-table';

export type ICandidateType = MRT_RowData & ICandidateSchema[]
export type IEmailTemplateType = MRT_RowData & ICandidateSchema[]

export interface ITableComponentProps {
  data: ICandidateType | IEmailTemplateType;
  columnsToDisplay: string[];
  page: 'customerPage' | 'emailTemplatePage' | string;
}

export interface IPageTables {
  [p: string]: typeof customerTableDataProps | typeof emailTemplatesTableDataProps;
}

export default function TableComponent({data, columnsToDisplay, page}: ITableComponentProps) {
    const pageTables: IPageTables = {
        [PAGES.customersPage]: customerTableDataProps,
        [PAGES.emailTemplatePage]: emailTemplatesTableDataProps,
    };

    return <Table
        tableData={data}
        columnsToDisplay={columnsToDisplay}
        tableDataProps={pageTables[page]}
    />;
}