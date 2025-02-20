import { ReactNode } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Link } from '@/i18n/routing';
import Image from 'next/image';
import { getFile } from '@/utils/getFile';
import { getHrUserProfile } from '@/app/_actions/getHrUserProfile';
import Button from '@/UI/Button/Button';
import DeleteProfileButton from '@/components/DeleteProfileButton/DeleteProfileButton';
import SetDataToStore from '@/components/SetDataToStore/SetDataToStore';
import LogoutButton from '@/components/Header/LogoutButton/LogoutButton';
import { DATABASES } from '@/constants/constants';
import globalStyles from '@/styles/global/globals.module.scss';
import styles from './hrUserProfile.module.scss';
import { getTranslations } from 'next-intl/server';
import { PAGES as TPages } from '@/messages/constants/constants';
import { redirect } from 'next/navigation';

export default async function CandidateProfileLayout({
  children,
}: {
  children: ReactNode;
}) {
  const translation = await getTranslations(TPages.hrUserProfile);
  const results = await getHrUserProfile();
  const parsedResults = results ? JSON.parse(results) : null;
  const { data } = parsedResults;

  if (!data) {
    redirect('/')
  }

  return (
    <div className={globalStyles.container}>
      <SetDataToStore data={data} databaseName={DATABASES.hrUsers} />
      <div className={styles.hrProfilePage}>
        <div className={styles.logoutContainer}>
          <h3>{`${translation("profile")}: ${data.name} ${data.surname}`}</h3>
          <LogoutButton />
        </div>
        <div className={styles.profilePicture}>
          <div id='profilePicture'>
            <Image
              src={getFile(data.profilePicture.file)!}
              alt='Profile image'
              width={200}
              height={200}
            />
            <div className={styles.buttonsContainer}>
              <Link href={`/hrUserProfile/editHrUserProfile`}>
                <Button
                  className='button'
                  text={translation("editProfile")}
                  startIcon={<AddIcon />}
                  type='button'
                />
              </Link>
              <DeleteProfileButton
                id={data.id}
                databaseName={DATABASES.hrUsers}
              />
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
