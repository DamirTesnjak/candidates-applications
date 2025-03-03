'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/routing';
import { useEffect } from 'react';

import { useAppSelector } from '@/lib/hooks';
import { getFile } from '@/utils/getFile';
import styles from '../header.module.scss';
import TutorialFeature from '@/components/TutorialFeature/TutorialFeature';
import Button from '@/UI/Button/Button';

export default function ProfileActions() {
  const translation = useTranslations('header');
  const profilePicture = useAppSelector((state) => state.hrUser.profilePicture);
  const username = useAppSelector((state) => state.hrUser.username);

  useEffect(() => {}, [username]);

  return (
    <div className={styles.profileAuthActions}>
      {username.length > 0 && (
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link href={`/hrUserProfile`}>
            <Button
              className='primaryTextButton'
              type='button'
              text={username}
              startIcon={
                <Image
                  id='profilePicture'
                  src={getFile(profilePicture.file)!}
                  width={25}
                  height={25}
                  alt='Loging button'
                  style={{
                    height: '25px',
                    borderRadius: '100%',
                  }}
                />
              }
            />
          </Link>
          <TutorialFeature />
        </div>
      )}
      {username.length === 0 && (
        <div className={styles.profileNameDisplay}>
          <Link href={`/register`}>
            <Button
              className='primaryTextButton'
              type='button'
              text={translation('profileActionsRegister')}
            />
          </Link>
          <Link href={`/login`}>
            <Button
              className='primaryTextButton'
              type='button'
              text={translation('profileActionsLogin')}
            />
          </Link>
        </div>
      )}
    </div>
  );
}
