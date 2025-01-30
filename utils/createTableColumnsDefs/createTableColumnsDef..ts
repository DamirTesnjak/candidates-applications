export default function getTableColumnsDef(tableData) {
    if (tableData && tableData.length === 0) {
        return [];
    }

    const getAccessorKeys = (item, accessoryKeyPrefix) => {
        const itemKeys = Object.keys(item);
        for (let i = 0; i < itemKeys.length; i++) {
            if (Object.keys(item[itemKeys[i]]).length > 0) {
                console.log('accessoryKeyPrefix', `${itemKeys[i]}.${accessoryKeyPrefix}`);
                getAccessorKeys(item[itemKeys[i]], `${itemKeys[i]}.${accessoryKeyPrefix}`);
            }
        }
        console.log('accessoryKeyPrefix', accessoryKeyPrefix);
        return accessoryKeyPrefix
    }

    const getColumnsDefs = () => {
        const accessorKeys = getAccessorKeys(tableData, "");
        return accessorKeys.map((accKey) => {
            if (accKey.includes(".")) {
                const accKeyArr = accKey.split(".");
                const lastKeyName = accKeyArr[accKeyArr.length - 1];
                // const getValue = (obj, path) => path.split('.').reduce((acc, key) => acc?.[key], obj);
                return {
                    accessorKey: lastKeyName,
                    header: lastKeyName,
                    size: 150,
                }
            }
        })
    }
    return getColumnsDefs();
}