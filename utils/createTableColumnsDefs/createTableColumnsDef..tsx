export const getAccessorKeys = ({item, accessoryKeyPrefix, accessoryKeys}) => {
    const keys = Object.keys(item);
    for (let i = 0; i < keys.length; i++) {
        if (typeof item[keys[i]] === 'object' && Object.keys(item[keys[i]]).length > 0) {
            getAccessorKeys({
                item: item[keys[i]],
                accessoryKeyPrefix: `${accessoryKeyPrefix}.${keys[i]}`,
                accessoryKeys,
            });
        } else {
            accessoryKeys.push(`${accessoryKeyPrefix}.${keys[i]}`.replace('.', ""))
        }
    }
}

export const getColumnsDefs = ({ tableData, doNotDisplayColumns, tableDataProps, extraAccessorKeys }) => {
    const accessoryKeys: string[] = [];
    getAccessorKeys({item: tableData[0], accessoryKeyPrefix: "", accessoryKeys});

    let filteredAccessorKeys = [...accessoryKeys, ...extraAccessorKeys];

    for (let i = 0; i < doNotDisplayColumns.length; i++) {
        filteredAccessorKeys = filteredAccessorKeys.filter((item) => item !== doNotDisplayColumns[i]);
    }

    return filteredAccessorKeys.map((keyItem) => {

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