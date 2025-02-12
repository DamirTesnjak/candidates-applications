import { TableProps } from '@/UI/Table/Table';
import { ICandidatesTableDataRowProps } from '@/app/[locale]/candidates/customerTableDataProps';
import { IEmailTemplatesTableDataRowProps } from '@/app/[locale]/settings/overviewEmailTemplateMessages/emailTemplatesTableDataProps';

export interface IGetColumnsDefsArg {
  columnsToDisplay: TableProps['columnsToDisplay'];
  columnDef: TableProps['columnDef'];
}

export interface IRow {
  original: ICandidatesTableDataRowProps['original'] &
    IEmailTemplatesTableDataRowProps['original'];
}

export const getColumnsDefs = ({
  columnsToDisplay,
  columnDef,
  translation,
}: IGetColumnsDefsArg) => {
  return columnsToDisplay.map((keyItem: string) => {
    const noDataRow = null;
    return {
      accessorKey: keyItem,
      header: columnDef(noDataRow, translation)[keyItem].title,
      size: columnDef(noDataRow, translation)[keyItem].size,
      enableColumnFilter: columnDef(noDataRow, translation)[keyItem].enableColumnFilter,
      enableColumnActions: columnDef(noDataRow, translation)[keyItem].enableColumnActions,
      enableColumnDragging: columnDef(noDataRow, translation)[keyItem].enableColumnDragging,
      enableSorting: columnDef(noDataRow, translation)[keyItem].enableSorting,
      Cell: ({ row }: { row: IRow | null }) => (
        <div>{columnDef(row, translation)[keyItem].cell}</div>
      ),
    };
  });
};
