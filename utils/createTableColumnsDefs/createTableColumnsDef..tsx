import { TableProps } from '@/UI/Table/Table';
import { ICandidatesTableDataRowProps } from '@/app/candidates/customerTableDataProps';
import {
  IEmailTemplatesTableDataRowProps
} from '@/app/settings/overviewEmailTemplateMessages/emailTemplatesTableDataProps';

export interface IGetColumnsDefsArg {
  columnsToDisplay: TableProps["columnsToDisplay"];
  tableDataProps: TableProps["tableDataProps"];
}

export interface IRow {
  original: ICandidatesTableDataRowProps["original"] & IEmailTemplatesTableDataRowProps["original"];
}

export const getColumnsDefs = ({ columnsToDisplay, tableDataProps }: IGetColumnsDefsArg) => {
    return columnsToDisplay.map((keyItem: string) => {
        const noDataRow = null;
        return {
            accessorKey: keyItem,
            header: tableDataProps(noDataRow)[keyItem].title,
            size: tableDataProps(noDataRow)[keyItem].size,
            enableColumnFilter: tableDataProps(noDataRow)[keyItem].enableColumnFilter,
            enableColumnActions: tableDataProps(noDataRow)[keyItem].enableColumnActions,
            enableColumnDragging: tableDataProps(noDataRow)[keyItem].enableColumnDragging,
            enableSorting: tableDataProps(noDataRow)[keyItem].enableSorting,
            Cell: ({ row }: { row: IRow | null }) => (<div>{tableDataProps(row)[keyItem].cell}</div>),
        }
    })
}