'use client';

import Image from 'next/image';
import {useTranslations} from 'next-intl';
import {Link} from '@/i18n/routing';
import { useEffect } from 'react';

import { useAppSelector } from '@/lib/hooks';
import { getFile } from '@/utils/getFile';
import styles from '../header.module.scss';

export default function ProfileActions() {
  const translation = useTranslations('header');
  const profilePicture = useAppSelector((state) => state.hrUser.profilePicture);
  const username = useAppSelector((state) => state.hrUser.username);

  useEffect(() => {}, [username]);

  return (
    <div className={styles.profileAuthActions}>
      {username.length > 0 && (
        <Link href={`/hrUserProfile`}>
          <div className={styles.profileNameDisplay}>
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
            <span>{username}</span>
          </div>
        </Link>
      )}
      {username.length === 0 && (
        <div className={styles.profileNameDisplay}>
          <Link href={`/register`}>{translation("header.profileActions.register")}</Link>
          <Link href={`/login`}>{translation("header.profileActions.login")}</Link>
        </div>
      )}
    </div>
  );
}
