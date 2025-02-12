import { ReactNode } from 'react';
import AddIcon from '@mui/icons-material/Add';
import Image from 'next/image';
import Link from 'next/link';
import { getCandidateProfile } from '@/app/_actions/getCandidateProfile';
import { getFile } from '@/utils/getFile';
import DeleteProfileButton from '@/components/DeleteProfileButton/DeleteProfileButton';
import SetDataToStore from '@/components/SetDataToStore/SetDataToStore';
import Button from '@/UI/Button/Button';
import { IParams } from '@/types/params';
import { DATABASES } from '@/constants/constants';
import globalStyles from '../../../../styles/global/globals.module.scss';
import styles from '../candidateProfile.module.scss';

export default async function CandidateProfileLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: IParams['params'];
}) {
  const { id } = await params;
  const results = await getCandidateProfile(id);
  const parsedResults = results ? JSON.parse(results) : null;
  const { data } = parsedResults;

  if (!data) {
    return <div>Could not found profile data</div>;
  }

  return (
    <div className={globalStyles.container}>
      <SetDataToStore data={data} databaseName={DATABASES.candidates} />
      <div className={styles.candidateProfilePage}>
        <h3
          className={styles.pageTitle}
        >{`${translation("candidateProfile.id.candidateProfile")}: ${data.name} ${data.surname}`}</h3>
        <div className={styles.profilePicture}>
          <div id='profilePicture'>
            <Image
              src={getFile(data.profilePicture.file)!}
              alt='Profile image'
              width={200}
              height={200}
            />
            <div className={styles.buttonsContainer}>
              <Link href={`/app/${locale}/candidateProfile/${id}/editCandidate`}>
                <Button
                  className='button'
                  text={translation("candidateProfile.id.edit.profile")}
                  startIcon={<AddIcon />}
                  type='button'
                />
              </Link>
              <DeleteProfileButton
                id={id}
                databaseName={DATABASES.candidates}
              />
            </div>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
