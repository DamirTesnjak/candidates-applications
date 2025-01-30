'use client'

import {
    MaterialReactTable,
    useMaterialReactTable,
} from "material-react-table";
import { useMemo } from "react";
import getTableColumnsDef from "@/utils/createTableColumnsDefs/createTableColumnsDef.";

export interface TableProps {
    data: { [x: string]: string | number };
}

export default function Table({data}: TableProps) {
    const columns = useMemo(() => getTableColumnsDef(data), [data]);

    const table = useMaterialReactTable({
        columns,
        data,
    });

    return <MaterialReactTable table={table} />;
}