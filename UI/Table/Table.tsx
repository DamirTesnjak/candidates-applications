'use client'

import {
    MaterialReactTable, MRT_RowData,
    useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import {getColumnsDefs} from "@/utils/createTableColumnsDefs/createTableColumnsDef.";

export interface TableProps {
    data: MRT_RowData[];
    columnsToDisplay: string[];
    tableDataProps: any;
}

export default function Table({data, columnsToDisplay, tableDataProps }: TableProps) {
    const getColumnsDefsProps = useMemo(() => ({
        columnsToDisplay,
        tableDataProps,
    }), [columnsToDisplay, tableDataProps])

    const columns = useMemo(() => getColumnsDefs(getColumnsDefsProps), [getColumnsDefsProps]);

    const table = useMaterialReactTable({
        columns,
        data,
        initialState: {
            showColumnFilters: true,
            density: 'compact',
        },
        enableColumnOrdering: true,
        muiTableHeadCellProps: {
            sx: {
                padding: '0 5px 0 5px',
                margin: 0
            }
        },
        muiTableBodyRowProps: {
        },
        muiTableBodyCellProps: {
            sx: {
                padding: '0 5px 0 5px',
                margin: 0
            }
        },
        muiBottomToolbarProps: {
        }
    });

    return <MaterialReactTable table={table} />;
}