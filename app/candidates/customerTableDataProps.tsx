import Image from "next/image";
import {getFile} from "@/utils/getFile";
import Button from "@/UI/Button/Button";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import Link from "next/link";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import LaunchIcon from "@mui/icons-material/Launch";
import ArchiveIcon from '@mui/icons-material/Archive';
import CancelIcon from '@mui/icons-material/Cancel';

interface TableDataProps {
    row: { original: { file: File } ; };
}

export const customerTableDataProps = (row = null) => {
    console.log('row', row);
    return {
        "profilePicture":
        {
            size: 100,
            cell: row ? <Image src={getFile({
                    name: row.original.profilePicture.file.name,
                    data: row.original.profilePicture.file.data,
                    contentType: row.original.profilePicture.contentType,
            })!} alt="Profile image" width={40} height={40} /> : null,
            enableColumnActions: false,
            enableColumnFilter: false,
            enableColumnDragging: false,
        },
        "name": {
        title: "Name",
            size: 150,
            cell: row?.original.name,
    },
        "surname": {
        title: "surname",
            size: 150,
            cell: row?.original.surname,
    },
        "curriculumVitae.file.data": {
        title: "CV",
            size: 100,
            cell: row ? <Button className="textButton" text="CV" type="button" onClick={() => getFile({
                name: row.original.curriculumVitae.file.name,
                    data: row.original.curriculumVitae.file.data,
                    contentType: row.original.curriculumVitae.contentType,
            })} startIcon={<CloudDownloadIcon />} /> : null,
            enableColumnActions: false,
            enableColumnFilter: false,
        },
        "contact.phoneNumber": {
        title: "Phone number",
            size: 150,
            cell: row?.original.contact.phoneNumber,
    },
        "contact.linkedIn": {
            title: "LinkedIn",
            size: 100,
            cell: row ? <Link href={row.original.contact.linkedIn} target="_blank"><Button className="textButton" type="button" startIcon={<LinkedInIcon />} /></Link> : null,
            enableColumnActions: false,
            enableColumnFilter: false,
        },
        "status.archived": {
        title: "Archived",
            size: 150,
            cell: row?.original.status.archived ? "True" : "False",
    },
        "status.employed": {
        title: "Employed",
            size: 150,
            cell: row?.original.status.employed ? "True" : "False",
    },
        "status.rejected": {
        title: "Rejected",
            size: 150,
            cell: row?.original.status.rejected ? "True" : "False",
    },
        "button1": {
            title: "",
            size: 150,
            cell: <Button className="textButton" text="Archive" type="button" startIcon={<ArchiveIcon />} />,
            enableColumnActions: false,
            enableColumnFilter: false,
            enableColumnDragging: false,
        },
        "button2": {
            title: "",
            size: 150,
            cell: <Button className="textButton" text="Hire" type="button" startIcon={<CloudDownloadIcon />} />,
            enableColumnActions: false,
            enableColumnFilter: false,
            enableColumnDragging: false,
        },
        "button3": {
            title: "",
            size: 150,
            cell: <Button className="textButton" text="Reject" type="button" startIcon={<CancelIcon />} />,
            enableColumnActions: false,
            enableColumnFilter: false,
            enableColumnDragging: false,
        },
        "button4": {
            title: "Profile Link",
            size: 150,
            cell: row ? <Link href={`/candidateProfile/${row.original._id}`} target="_blank"><Button className="textButton" type="button" startIcon={<LaunchIcon />} /></Link> : null,
            enableColumnActions: false,
            enableColumnFilter: false,
            enableColumnDragging: false,
        },
}};