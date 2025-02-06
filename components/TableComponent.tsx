'use client'

import { customerTableDataProps } from "@/app/candidates/customerTableDataProps"
import { emailTemplatesTableDataProps } from "@/app/settings/overviewEmailTemplateMessages/emailTemplatesTableDataProps";
import Table from "../UI/Table/Table";
import {PAGES} from "@/constants/constants";

export default function tableComponent({data, columnsToDisplay, page}) {
    const pageTables = {
        [PAGES.customersPage]: customerTableDataProps,
        [PAGES.emailTemplatePage]: emailTemplatesTableDataProps,
    };

    return <Table
        data={data}
        columnsToDisplay={columnsToDisplay}
        tableDataProps={pageTables[page]}
        />;

}