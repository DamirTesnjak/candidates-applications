'use client'

import { customerTableDataProps } from "@/app/candidates/customerTableDataProps";
import Table from "../UI/Table/Table";
import {PAGES} from "@/constants/constants";

export default function tableComponent({data, doNotDisplayColumns, extraAccessorKeys, page}) {
    const pageTables = {
        [PAGES.customersPage]: customerTableDataProps,
    };

    return <Table
        data={data}
        doNotDisplayColumns={doNotDisplayColumns}
        extraAccessorKeys={extraAccessorKeys}
        tableDataProps={pageTables[page]}
        />;

}