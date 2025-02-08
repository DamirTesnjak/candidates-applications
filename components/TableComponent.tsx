'use client'

import { customerTableDataProps, TableDataProps } from '@/app/candidates/customerTableDataProps';
import { emailTemplatesTableDataProps } from "@/app/settings/overviewEmailTemplateMessages/emailTemplatesTableDataProps";
import Table from "../UI/Table/Table";
import {PAGES} from "@/constants/constants";

export interface IpageTables {
  [p: string]: {
      size: number,
      cell: Element | null,
      enableColumnActions: boolean,
      enableColumnFilter: boolean,
      enableColumnDragging: boolean,
      enableSorting: boolean
  }
}

export default function tableComponent({data, columnsToDisplay, page}) {
    const pageTables = {
        [PAGES.customersPage]: customerTableDataProps,
        [PAGES.emailTemplatePage]: emailTemplatesTableDataProps,
    } as IpageTables;

    return <Table
        data={data}
        columnsToDisplay={columnsToDisplay}
        tableDataProps={pageTables[page]}
    />;
}