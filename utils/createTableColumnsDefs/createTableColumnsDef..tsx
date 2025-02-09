import { TableProps } from '@/UI/Table/Table';

export interface IgetColumnsDefsArg {
  columnsToDisplay: TableProps["columnsToDisplay"];
  tableDataProps: TableProps["tableDataProps"];
}

export const getColumnsDefs = ({ columnsToDisplay, tableDataProps }: IgetColumnsDefsArg) => {
    return columnsToDisplay.map((keyItem: string) => {
        return {
            accessorKey: keyItem,
            header: tableDataProps()[keyItem].title,
            size: tableDataProps()[keyItem].size,
            enableColumnFilter: tableDataProps()[keyItem].enableColumnFilter,
            enableColumnActions: tableDataProps()[keyItem].enableColumnActions,
            enableColumnDragging: tableDataProps()[keyItem].enableColumnDragging,
            enableSorting: tableDataProps()[keyItem].enableSorting,
            Cell: ({ renderedCellValue, row}) => (<div>{tableDataProps(row)[keyItem].cell}</div>),
        }
    })
}