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
}: IGetColumnsDefsArg) => {
  return columnsToDisplay.map((keyItem: string) => {
    const noDataRow = null;
    return {
      accessorKey: keyItem,
      header: columnDef(noDataRow)[keyItem].title,
      size: columnDef(noDataRow)[keyItem].size,
      enableColumnFilter: columnDef(noDataRow)[keyItem].enableColumnFilter,
      enableColumnActions: columnDef(noDataRow)[keyItem].enableColumnActions,
      enableColumnDragging: columnDef(noDataRow)[keyItem].enableColumnDragging,
      enableSorting: columnDef(noDataRow)[keyItem].enableSorting,
      Cell: ({ row }: { row: IRow | null }) => (
        <div>{columnDef(row)[keyItem].cell}</div>
      ),
    };
  });
};
