'use client';

import { ReactNode, useActionState, useEffect, useState } from 'react';
import ArchiveIcon from '@mui/icons-material/Archive';
import WorkIcon from '@mui/icons-material/Work';
import CancelIcon from '@mui/icons-material/Cancel';
import { sendEmail } from '@/app/_actions/sendEmail';
import Button from '@/UI/Button/Button';
import Modal from '@/components/Modal/Modal';
import ModalContentMessage from '@/components/Modal/ModalContentMessage/ModalContent';
import { IShowModal } from '@/types/ShowModalType';
import { IRowButton } from '@/types/rowButton';
import { IPrevState } from '@/utils/types/prevState';

export interface IButtonIcons {
  [x: string]: ReactNode;
}

const buttonIcons: IButtonIcons = {
  archive: <ArchiveIcon />,
  hire: <WorkIcon />,
  reject: <CancelIcon />,
};

export function RowButton({ clientId, name, text, value, icon }: IRowButton) {
  const [response, formAction] = useActionState<IPrevState, FormData>(
    sendEmail,
    {},
  );
  const [showModal, setShowModal] = useState<IShowModal>({
    success: false,
    error: false,
  });

  useEffect(() => {
    if (
      response &&
      (response.errorMessage || response.success)
    ) {
      setShowModal({
        success: response.success,
        error: response.error,
      });
    }
  }, [response]);
  return (
    <div>
      <form action={formAction}>
        <input name='id' value={clientId} readOnly hidden />
        <input name={name} value={value} readOnly hidden />
        <Button
          className='submitButton'
          text={text}
          type='submit'
          startIcon={buttonIcons[icon]}
        />
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
