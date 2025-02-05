import Button from "@/UI/Button/Button";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import {ICandidateSchema} from "@/utils/dbConfig/models/candidateModel.js";
import Link from "next/link";

interface TableDataProps {
    original: {
        _id: ICandidateSchema["id"];
        emailType: string;
    };
}

export const emailTemplatesTableDataProps = (row: TableDataProps) => {
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