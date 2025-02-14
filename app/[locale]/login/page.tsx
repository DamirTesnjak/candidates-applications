'use client';

import { useActionState, useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {useTranslations} from 'next-intl';
import { loginHrUser } from '@/app/_actions/loginHrUser';
import { getHrUserProfile } from '@/app/_actions/getHrUserProfile';
import { useAppDispatch } from '@/lib/hooks';
import { loadUpdateHrUser } from '@/lib/features/hrUser/hrUserSlice';
import Input from '@/UI/Input/Input';
import Button from '@/UI/Button/Button';
import Modal from '@/components/Modal/Modal';
import ModalContentMessage from '@/components/Modal/ModalContentMessage/ModalContent';
import { IShowModal } from '@/types/ShowModalType';
import { IPrevState } from '@/utils/types/prevState';
import { PAGES as TPages } from '@/messages/constants/constants';
import styles from '@/components/EditForm/editForm.module.scss';

export default function LoginPage() {
  const translation = useTranslations("login");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const inputFields = [
    { name: 'username', type: 'text', label: translation("username") },
    { name: 'password', type: 'password', label: translation("password") },
  ];

  const [response, formAction] = useActionState<IPrevState, FormData>(
    loginHrUser,
    {},
  );
  const [showModal, setShowModal] = useState<IShowModal>({
    error: false,
  });

  const getHrUserProfileData = useCallback(async () => {
    const result = await getHrUserProfile();
    const parsedResult = JSON.parse(result);
    const { data } = parsedResult;
    dispatch(loadUpdateHrUser(data));
    router.push(`${locale}/candidates`);
  }, [dispatch, router]);

  const formContent = inputFields.map((inputField) => {
    return (
      <div key={inputField.name}>
        <Input
          className='standard'
          name={inputField.name}
          label={inputField.label}
          type={inputField.type}
          flow='flowRow'
          errorMessage={
            response && response.errorFieldValidation
              ? response.errorFieldValidation[inputField.name]
              : null
          }
          defaultValue={
            response && response.error && response.prevState
              ? response.prevState[inputField.name]
              : ''
          }
        />
      </div>
    );
  });

  useEffect(() => {
    if (response && response.success) {
      getHrUserProfileData();
    }
  }, [getHrUserProfileData, response]);

  useEffect(() => {
    if (response && (response.errorMessage || response.success)) {
      setShowModal({ error: response.error });
    }
  }, [response]);

  return (
    <div>
      <form action={formAction}>
        {formContent}
        <div className={styles.buttonsContainer}>
          <Button className='submitButton' type='submit' text={translation("profileActionsLogin")} />
        </div>
      </form>
      {showModal.error && (
        <Modal
          type='error'
          content={
            <ModalContentMessage
              response={response}
              setShowModal={setShowModal}
            />
          }
        />
      )}
    </div>
  );
}
