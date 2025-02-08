'use client'

import {
    MaterialReactTable, MRT_RowData,
    useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import {getColumnsDefs} from "@/utils/createTableColumnsDefs/createTableColumnsDef.";
import { TableDataProps } from '@/app/candidates/customerTableDataProps';

export interface TableProps {
    data: MRT_RowData[];
    columnsToDisplay: string[];
    tableDataProps: (row: TableDataProps) => {
      [x: string]: {
        size: number,
        cell: Element | null,
        enableColumnActions: boolean,
        enableColumnFilter: boolean,
        enableColumnDragging: boolean,
        enableSorting: boolean
      };
    };
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
        muiTableBodyCellProps: {
            sx: {
                color: '#6c757d',
                fontWeight: 300,
                padding: '0 5px',
            }
        },
        muiTableHeadCellProps: {
            sx: {
                color: '#6c757d',
                '.MuiInputBase-root': {
                   'input': {
                       fontSize: '12px',
                   }
                },
                padding: '0 5px',
            }
        },
        muiBottomToolbarProps: {
            sx: {
                fontWeight: 300,
            }
        }
    });

    return <MaterialReactTable table={table} />;
}