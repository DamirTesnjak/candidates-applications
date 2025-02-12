'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { logoutHrUser } from '@/app/_actions/logoutHrUser';
import Button from '../../../UI/Button/Button';
import SetDataToStore from '@/components/SetDataToStore/SetDataToStore';
import { initialStateHrUser } from '@/lib/features/hrUser/hrUserSlice';
import { DATABASES } from '@/constants/constants';

export default function LogoutButton() {
  const translation = useTranslations("deleteEmailTemplateButton");
  const [success, setSuccess] = useState<boolean>(false);

  const handleLogout = async () => {
    const result = await logoutHrUser();
    setSuccess(result.success);
  };

  return (
    <div>
      <Button
        className='submitButton'
        type='submit'
        text={translation("header.logoutButton.logout")}
        onClick={() => handleLogout()}
      />
      {success && (
        <SetDataToStore
          data={initialStateHrUser}
          databaseName={DATABASES.hrUsers}
        />
      )}
    </div>
  );
}
