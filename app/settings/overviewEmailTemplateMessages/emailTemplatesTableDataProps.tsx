import Button from "@/UI/Button/Button";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from "next/link";
import { ReactNode } from 'react';
import { IEmailTemplateSchema } from '@/utils/dbConfig/models/emailTemplateModel';

export interface IEmailTemplatesTableDataRowProps {
    original: {
        _id: IEmailTemplateSchema["id"];
        emailType: string;
    };
}

export const emailTemplatesTableDataProps = (row: IEmailTemplatesTableDataRowProps | null): {
  [x: string]: {
    title: string;
    size: number;
    cell: ReactNode | string | null;
    enableColumnActions?: boolean;
    enableColumnFilter?: boolean;
    enableColumnDragging?: boolean
    enableSorting?: boolean;
  }
} => {
    return {
        "emailType": {
            title: "Email Type",
            size: 100,
            cell: `${row?.original.emailType}`,
            enableColumnDragging: false,
        },
        "button1": {
            title: "",
            size: 150,
            cell: row ? <Link href={`/settings/emailType/${row.original._id}`}><Button className="textButton" type="button" startIcon={<EditIcon />} /></Link> : null,
            enableColumnActions: false,
            enableColumnFilter: false,
            enableColumnDragging: false,
            enableSorting: false
        },
        "button2": {
            title: "",
            size: 150,
            cell: row ? <Button className="textButton" type="button" startIcon={<DeleteIcon />} /> : null,
            enableColumnActions: false,
            enableColumnFilter: false,
            enableColumnDragging: false,
            enableSorting: false,
        },
}};