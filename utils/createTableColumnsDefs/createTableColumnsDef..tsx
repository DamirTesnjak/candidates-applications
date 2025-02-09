import { TableDataProps } from '@/app/candidates/customerTableDataProps';

export interface IgetColumnsDefsArg {
  columnsToDisplay: string[];
  tableDataProps: (row: TableDataProps | null) => {
    [x: string]: {
      size: number,
      title: string,
      cell: Element | null,
      enableColumnActions: boolean,
      enableColumnFilter: boolean,
      enableColumnDragging: boolean,
      enableSorting: boolean
    };
  };
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