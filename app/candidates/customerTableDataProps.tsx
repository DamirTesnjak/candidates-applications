import Image from "next/image";
import {getFile} from "@/utils/getFile";
import Button from "@/UI/Button/Button";
import Link from "next/link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LaunchIcon from "@mui/icons-material/Launch";
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import {ICandidateSchema} from "@/utils/dbConfig/models/candidateModel.js";
import { ReactNode } from 'react';

import { RowButton } from '@/UI/Table/RowButton/RowButton';

export interface TableDataProps {
    original: {
        _id: ICandidateSchema["id"];
        name: string;
        surname: string;
        contact: ICandidateSchema["contact"];
        status: ICandidateSchema["status"];
        profilePicture: ICandidateSchema["profilePicture"];
        curriculumVitae: ICandidateSchema["curriculumVitae"];
    };
}

export const customerTableDataProps = (row: TableDataProps | null): {
  [x: string]: {
    title?: string;
    size: number;
    cell: ReactNode | string | null;
    enableColumnActions?: boolean;
    enableColumnFilter?: boolean;
    enableColumnDragging?: boolean
    enableSorting?: boolean;
  }
} => {
    return {
        "profilePicture":
        {
            size: 50,
            cell: row ? <Image src={getFile(
                {
                    name: row.original.profilePicture.file.name,
                    data: row.original.profilePicture.file.data,
                    contentType: row.original.profilePicture.file.contentType,
                })!} alt="Profile image" width={40} height={40} /> : null,
            enableColumnActions: false,
            enableColumnFilter: false,
            enableColumnDragging: false,
            enableSorting: false,
        },
        "name": {
            title: "Name",
            size: 100,
            cell: `${row?.original.name}
            ${row?.original.surname}`,
            enableColumnDragging: false,
        },
        "curriculumVitae": {
            title: "CV",
            size: 100,
            cell: row ? <Button className="textButton" text="CV" type="button" onClick={() => getFile({
                name: row.original.curriculumVitae.file.name,
                    data: row.original.curriculumVitae.file.data,
                    contentType: row.original.curriculumVitae.file.contentType,
            })} startIcon={<CloudDownloadIcon />} /> : null,
            enableColumnActions: false,
            enableColumnFilter: false,
            enableColumnDragging: false,
            enableSorting: false,
        },
        "phoneNumber": {
            title: "Phone number",
            size: 150,
            cell: row?.original.contact.phoneNumber,
            enableColumnDragging: false,
        },
        "linkedIn": {
            title: "LinkedIn",
            size: 100,
            cell: row ? <Link href={row.original.contact.linkedIn} target="_blank"><Button className="textButton" type="button" startIcon={<LinkedInIcon />} /></Link> : null,
            enableColumnActions: false,
            enableColumnFilter: false,
            enableColumnDragging: false,
            enableSorting: false,
        },
        "archived": {
            title: "Archived",
            size: 150,
            cell: row?.original.status.archived ? "True" : "False",
            enableColumnDragging: false,
        },
        "hired": {
            title: "Hired",
            size: 150,
            cell: row?.original.status.employed ? "True" : "False",
            enableColumnDragging: false,
        },
        "rejected": {
            title: "Rejected",
            size: 150,
            cell: row?.original.status.rejected ? "True" : "False",
            enableColumnDragging: false,
        },
        "button1": {
            title: "",
            size: 150,
            cell: row ? <RowButton clientId={row.original._id} name="emailTemplateType" text="Archive" value="archive" icon="archive" /> : null,
            enableColumnActions: false,
            enableColumnFilter: false,
            enableColumnDragging: false,
            enableSorting: false
        },
        "button2": {
            title: "",
            size: 150,
            cell: row ? <RowButton clientId={row.original._id} text="Hire" value="hire" name="emailTemplateType" icon="hire" /> : null,
            enableColumnActions: false,
            enableColumnFilter: false,
            enableColumnDragging: false,
            enableSorting: false,
        },
        "button3": {
            title: "",
            size: 150,
            cell: row ? <RowButton clientId={row.original._id} text="Reject" value="reject" name="emailTemplateType" icon="reject" /> : null,
            enableColumnActions: false,
            enableColumnFilter: false,
            enableColumnDragging: false,
            enableSorting: false,
        },
        "button4": {
            title: "Profile Link",
            size: 150,
            cell: row ? <Link href={`/candidateProfile/${row.original._id}`} ><Button className="textButton" type="button" startIcon={<LaunchIcon />} /></Link> : null,
            enableColumnActions: false,
            enableColumnFilter: false,
            enableColumnDragging: false,
            enableSorting: false,
        },
}};