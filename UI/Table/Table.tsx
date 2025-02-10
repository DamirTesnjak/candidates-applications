'use client'

import {
  MaterialReactTable,
  useMaterialReactTable
} from 'material-react-table';
import { useMemo } from "react";
import {getColumnsDefs} from "@/utils/createTableColumnsDefs/createTableColumnsDef.";
import { ITableComponentProps } from '@/components/TableComponent';
import { candidatesTableDataProps } from '@/app/candidates/customerTableDataProps';
import {
  emailTemplatesTableDataProps
} from '@/app/settings/overviewEmailTemplateMessages/emailTemplatesTableDataProps';

export interface TableProps {
    tableData: ITableComponentProps["data"];
    columnsToDisplay: ITableComponentProps["columnsToDisplay"];
    tableDataProps: typeof candidatesTableDataProps | typeof emailTemplatesTableDataProps;
}

export default function Table({tableData, columnsToDisplay, tableDataProps }: TableProps) {
    const getColumnsDefsProps = useMemo(() => ({
        columnsToDisplay,
        tableDataProps,
    }), [columnsToDisplay, tableDataProps])

    const columns = useMemo(() => getColumnsDefs(getColumnsDefsProps), [getColumnsDefsProps]);

    const table = useMaterialReactTable({
        columns,
        data: tableData,
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