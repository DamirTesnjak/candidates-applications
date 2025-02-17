import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import {Link} from '@/i18n/routing';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import LaunchIcon from '@mui/icons-material/Launch';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CircleIcon from '@mui/icons-material/Circle';
import { getFile } from '@/utils/getFile';
import Button from '@/UI/Button/Button';
import { RowButton } from '@/UI/Table/RowButton/RowButton';
import { ICandidateSchema } from '@/utils/dbConfig/models/candidateModel.js.js';

export interface ICandidatesTableDataRowProps {
  original: {
    id: ICandidateSchema['id'];
    name: string;
    surname: string;
    contact: ICandidateSchema['contact'];
    status: ICandidateSchema['status'];
    profilePicture: ICandidateSchema['profilePicture'];
    curriculumVitae: ICandidateSchema['curriculumVitae'];
  };
}

export const candidatesColumnDef = (
  row: ICandidatesTableDataRowProps | null,
  translation: typeof useTranslations
): {
  [x: string]: {
    title: string;
    size: number;
    cell: ReactNode | string | null;
    enableColumnActions?: boolean;
    enableColumnFilter?: boolean;
    enableColumnDragging?: boolean;
    enableSorting?: boolean;
  };
} => {
  return {
    profilePicture: {
      title: '',
      size: 50,
      cell: row ? (
        <Image
          src={
            getFile({
              name: row.original.profilePicture.file.name,
              data: row.original.profilePicture.file.data,
              contentType: row.original.profilePicture.file.contentType,
            })!
          }
          alt='Profile image'
          width={40}
          height={40}
        />
      ) : null,
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
    name: {
      title: translation("name") as unknown as string,
      size: 100,
      cell: `${row?.original.name}
            ${row?.original.surname}`,
      enableColumnActions: false,
      enableColumnDragging: false,
    },
    curriculumVitae: {
      title: 'CV',
      size: 100,
      cell: row ? (
        <Button
          className='textButton'
          text='CV'
          type='button'
          onClick={() =>
            getFile({
              name: row.original.curriculumVitae.file.name,
              data: row.original.curriculumVitae.file.data,
              contentType: row.original.curriculumVitae.file.contentType,
            })
          }
          startIcon={<CloudDownloadIcon />}
        />
      ) : null,
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
    phoneNumber: {
      title: translation("phoneNumber") as unknown as string,
      size: 150,
      cell: row?.original.contact.phoneNumber,
      enableColumnActions: false,
      enableColumnDragging: false,
    },
    linkedIn: {
      title: 'LinkedIn',
      size: 100,
      cell: row ? (
        <Link href={row.original.contact.linkedIn} target='_blank'>
          <Button
            className='textButton'
            type='button'
            startIcon={<LinkedInIcon />}
          />
        </Link>
      ) : null,
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
    archived: {
      title: translation("archived") as unknown as string,
      size: 150,
      cell: row?.original.status.archived ? <CircleIcon style={{ fontSize: 10, color: "green" }} /> : <CircleIcon style={{ fontSize: 10, color: "grey" }} />,
      enableColumnActions: false,
      enableColumnDragging: false,
    },
    hired: {
      title: translation("hired") as unknown as string,
      size: 150,
      cell: row?.original.status.employed ? <CircleIcon style={{ fontSize: 10, color: "green" }} /> : <CircleIcon style={{ fontSize: 10, color: "grey" }} />,
      enableColumnActions: false,
      enableColumnDragging: false,
    },
    rejected: {
      title: translation("rejected") as unknown as string,
      size: 150,
      cell: row?.original.status.rejected ? <CircleIcon style={{ fontSize: 10, color: "green" }} /> : <CircleIcon style={{ fontSize: 10, color: "grey" }} />,
      enableColumnActions: false,
      enableColumnDragging: false,
    },
    button1: {
      title: '',
      size: 150,
      cell: row ? (
        <RowButton
          clientId={row.original.id}
          name='emailTemplateType'
          text={translation("archive") as unknown as string}
          value='archive'
          icon='archive'
        />
      ) : null,
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
    button2: {
      title: '',
      size: 150,
      cell: row ? (
        <RowButton
          clientId={row.original.id}
          text={translation("hire") as unknown as string}
          value='hire'
          name='emailTemplateType'
          icon='hire'
        />
      ) : null,
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
    button3: {
      title: '',
      size: 150,
      cell: row ? (
        <RowButton
          clientId={row.original.id}
          text={translation("reject") as unknown as string}
          value='reject'
          name='emailTemplateType'
          icon='reject'
        />
      ) : null,
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
    button4: {
      title: translation("profileLink") as unknown as string,
      size: 150,
      cell: row ? (
        <Link href={`/candidateProfile/${row.original.id}`}>
          <Button
            className='textButton'
            type='button'
            startIcon={<LaunchIcon />}
          />
        </Link>
      ) : null,
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
  };
};
