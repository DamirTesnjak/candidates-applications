'use client';

import { useActionState, useState, useEffect } from 'react';
import {useTranslations} from 'next-intl';
import { createHrUser } from '@/app/_actions/createHrUser';
import Input from '@/UI/Input/Input';
import Button from '@/UI/Button/Button';
import Modal from '@/components/Modal/Modal';
import ModalContentMessage from '@/components/Modal/ModalContentMessage/ModalContent';
import { IShowModal } from '@/types/ShowModalType';
import { IPrevState } from '@/utils/types/prevState';
import { PAGES as TPage} from '@/messages/constants/constants';
import styles from '@/components/EditForm/editForm.module.scss';

export default function RegisterPage() {
  const translation = useTranslations(TPage.register);

  const inputFields = [
    { name: 'name', type: 'text', label: translation('register.name') },
    { name: 'surname', type: 'text', label: translation('register.surname') },
    {
      name: 'companyName',
      type: 'text',
      label: translation('register.company'),
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: translation('register.phoneNumber'),
    },
    { name: 'email', type: 'email', label: translation('register.email') },
    { name: 'username', type: 'text', label: translation('register.username') },
    {
      name: 'password',
      type: 'password',
      label: translation('register.password'),
    },
  ];

  const [response, formAction] = useActionState<IPrevState, FormData>(
    createHrUser,
    {},
  );
  const [showModal, setShowModal] = useState<IShowModal>({
    success: false,
    error: false,
  });

  useEffect(() => {
    if (response && (response.error || response.success)) {
      setShowModal({
        success: response.success,
        error: response.error,
      });
    }
  }, [response]);

  const formContent = inputFields.map((inputField) => {
    return (
      <Input
        key={inputField.name}
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
    );
  });

  return (
    <div>
      <form action={formAction}>
        {formContent}
        <div className={styles.buttonsContainer}>
          <Input
            className='uploadButton'
            flow='flowRow'
            label={translation('register.profilePicture')}
            name='profilePicture'
            type='file'
          />
          <Button
            className='submitButton'
            type='submit'
            text={translation('register.saveChanges')}
          />
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
      {showModal.success && (
        <Modal
          type='success'
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
