import { ReactNode } from 'react';
import { useTranslations } from 'next-intl';
import {Link} from '@/i18n/routing';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@/UI/Button/Button';
import { IEmailTemplateSchema } from '@/utils/dbConfig/models/emailTemplateModel';
import DeleteEmailTemplateButton from '@/components/DeleteEmailTemplateButton/DeleteEmailTemplateButton';

export interface IEmailTemplatesTableDataRowProps {
  original: {
    _id: IEmailTemplateSchema['id'];
    emailType: string;
  };
}

export const emailTemplatesColumnDef = (
  row: IEmailTemplatesTableDataRowProps | null,
  translation: typeof useTranslations,
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
    emailType: {
      title: translation("emailType") as unknown as string,
      size: 100,
      cell: `${row?.original.emailType}`,
      enableColumnActions: false,
      enableColumnDragging: false,
    },
    button1: {
      title: '',
      size: 150,
      cell: row ? (
        <Link href={`/settings/emailType/${row.original._id}`}>
          <Button
            className='textButton'
            type='button'
            startIcon={<EditIcon />}
          />
        </Link>
      ) : null,
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
    button2: {
      title: '',
      size: 150,
      cell: row ? (<DeleteEmailTemplateButton id={row.original._id}/>) : null,
      enableColumnActions: false,
      enableColumnFilter: false,
      enableColumnDragging: false,
      enableSorting: false,
    },
  };
};
