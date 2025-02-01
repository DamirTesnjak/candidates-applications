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
    columnsToDisplay: string[];
    tableDataProps: any;
}

export default function Table({data, columnsToDisplay, tableDataProps }: TableProps) {
    const getColumnsDefsProps = useMemo(() => ({
        columnsToDisplay,
        tableDataProps,
    }), [columnsToDisplay, data, tableDataProps])

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
        },
        muiBottomToolbarProps: {
            className: styles.tablePagination,
        }
    });

    return <MaterialReactTable table={table} />;
}