export const getColumnsDefs = ({ columnsToDisplay, tableDataProps }) => {
    return columnsToDisplay.map((keyItem) => {

        return {
            accessorKey: keyItem,
            header: tableDataProps()[keyItem].title,
            size: tableDataProps()[keyItem].size,
            enableColumnFilter: tableDataProps()[keyItem].enableColumnFilter,
            enableColumnActions: tableDataProps()[keyItem].enableColumnActions,
            enableColumnDragging: tableDataProps()[keyItem].enableColumnDragging,
            Cell: ({ renderedCellValue, row}) => (<div>{tableDataProps(row)[keyItem].cell}</div>),
        }
    })
}