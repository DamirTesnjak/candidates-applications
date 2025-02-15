import { ReactNode } from 'react';
import AddIcon from '@mui/icons-material/Add';
import {Link} from '@/i18n/routing';
import Image from 'next/image';
import { getFile } from '@/utils/getFile';
import { getHrUserProfile } from '@/app/_actions/getHrUserProfile';
import ErrorMessage from '@/components/ErrorMessage/ErrorMessage';
import globalStyles from '@/styles/global/globals.module.scss';
import { getTranslations } from 'next-intl/server';
import { PAGES as TPages } from '@/messages/constants/constants';

export default async function HelpLayout({
                                                       children,
                                                     }: {
  children: ReactNode;
  params: { id: string };
}) {
  const translation = await getTranslations(TPages.hrUserProfile);
  const results = await getHrUserProfile();
  const parsedResults = results ? JSON.parse(results) : null;
  const { data } = parsedResults;

  if (!data) {
    return <ErrorMessage text={translation("couldNotFindProfileData")} />;
  }

  return (
    <div className={globalStyles.container}>
      {children}
    </div>
  );
}
