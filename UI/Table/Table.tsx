'use client';

import {
  MaterialReactTable,
  useMaterialReactTable,
} from 'material-react-table';
import { useMemo } from 'react';
import { getColumnsDefs } from '@/utils/createTableColumnsDefs/createTableColumnsDef.';
import { ITableComponentProps } from '@/components/TableComponent';
import { candidatesColumnDef } from '@/app/[locale]/candidates/customerTableDataProps';
import { emailTemplatesColumnDef } from '@/app/[locale]/settings/overviewEmailTemplateMessages/emailTemplatesTableDataProps';
import { useTranslations } from 'next-intl';

export interface TableProps {
  tableData: ITableComponentProps['tableData'];
  columnsToDisplay: ITableComponentProps['columnsToDisplay'];
  columnDef: typeof candidatesColumnDef | typeof emailTemplatesColumnDef;
  translation: typeof useTranslations;
}

export default function Table({
  tableData,
  columnsToDisplay,
  columnDef,
  translation
}: TableProps) {
  const getColumnsDefsProps = useMemo(
    () => ({
      columnsToDisplay,
      columnDef,
      translation,
    }),
    [columnsToDisplay, columnDef, translation],
  );

  const columns = useMemo(
    () => getColumnsDefs(getColumnsDefsProps),
    [getColumnsDefsProps],
  );

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
      },
    },
    muiTableHeadCellProps: {
      sx: {
        color: '#6c757d',
        '.MuiInputBase-root': {
          input: {
            fontSize: '12px',
          },
        },
        padding: '0 5px',
      },
    },
    muiBottomToolbarProps: {
      sx: {
        fontWeight: 300,
      },
    },
  });

  return <MaterialReactTable table={table} />;
}
