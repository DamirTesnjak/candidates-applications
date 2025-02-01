'use client'

import { customerTableDataProps } from "@/app/candidates/customerTableDataProps";
import Table from "../UI/Table/Table";
import {PAGES} from "@/constants/constants";

export default function tableComponent({data, columnsToDisplay, page}) {
    const pageTables = {
        [PAGES.customersPage]: customerTableDataProps,
    };

    return <Table
        data={data}
        columnsToDisplay={columnsToDisplay}
        tableDataProps={pageTables[page]}
        />;

}