'use client'

import { candidatesTableDataProps } from '@/app/candidates/customerTableDataProps';
import { emailTemplatesTableDataProps } from "@/app/settings/overviewEmailTemplateMessages/emailTemplatesTableDataProps";
import Table from "../UI/Table/Table";
import {PAGES} from "@/constants/constants";
import { ICandidateSchema } from '@/utils/dbConfig/models/candidateModel.js';
import { IEmailTemplateSchema } from '@/utils/dbConfig/models/emailTemplateModel';

export interface IDataType extends ICandidateSchema, IEmailTemplateSchema {}

export interface ITableComponentProps {
  data: IDataType[];
  columnsToDisplay: string[];
  page: 'customerPage' | 'emailTemplatePage' | string;
}

export interface IPageTables {
  [p: string]: typeof candidatesTableDataProps | typeof emailTemplatesTableDataProps;
}

export default function TableComponent({data, columnsToDisplay, page}: ITableComponentProps) {
    const pageTables: IPageTables = {
        [PAGES.customersPage]: candidatesTableDataProps,
        [PAGES.emailTemplatePage]: emailTemplatesTableDataProps,
    };

    return <Table
        tableData={data}
        columnsToDisplay={columnsToDisplay}
        tableDataProps={pageTables[page]}
    />;
}