'use client'

import {
    MaterialReactTable, MRT_RowData,
    useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import {getColumnsDefs} from "@/utils/createTableColumnsDefs/createTableColumnsDef.";
import styles from "./table.module.scss";

export interface TableProps {
    data: MRT_RowData[];
    doNotDisplayColumns: string[];
    extraAccessorKeys: string[];
    tableDataProps: any;
}

export default function Table({data, doNotDisplayColumns, extraAccessorKeys, tableDataProps }: TableProps) {
    const getColumnsDefsProps = useMemo(() => ({
        tableData: data,
        doNotDisplayColumns,
        tableDataProps,
        extraAccessorKeys: extraAccessorKeys || [],
    }), [data, doNotDisplayColumns, extraAccessorKeys, tableDataProps])

    const columns = useMemo(() => getColumnsDefs(getColumnsDefsProps), [getColumnsDefsProps]);

    const table = useMaterialReactTable({
        columns,
        data,
        initialState: {
            showColumnFilters: true,
        },
        enableColumnOrdering: true,
        muiTableHeadCellProps: {
            className: styles.tableHeaderCell,
        },
        muiTableBodyRowProps: {
            className: styles.tableBodyRow,
        },
        muiTableBodyCellProps: {
            className: styles.tableBodyCell,
        }
    });

    return <MaterialReactTable table={table} />;
}