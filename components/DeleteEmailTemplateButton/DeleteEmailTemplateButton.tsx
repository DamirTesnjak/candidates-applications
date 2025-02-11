'use client';

import { useState, useTransition } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import Modal from '@/components/Modal/Modal';
import ModalContentMessage from '@/components/Modal/ModalContentMessage/ModalContent';
import Button from '@/UI/Button/Button';
import { deleteEmailTemplate } from '@/app/_actions/deleteEmailTemplate';
import { IPrevState } from '@/utils/types/prevState';
import { IShowModal } from '@/types/ShowModalType';

export default function DeleteEmailTemplateButton({ id }: { id: string; }) {
  const [, startTransition] = useTransition();
  const [modal, openModal] = useState<boolean>(false);
  const [response, setResponse] = useState<IPrevState>({});
  const [showModal, setShowModal] = useState<IShowModal>({
    success: false,
    error: false,
  });

  const submitAction = async (formData: FormData) => {
    startTransition(async () => {
      const result = await deleteEmailTemplate(formData);
      setResponse(result);
    });
  };

  const modalContent = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div>
        Do you want to delete this email template? The action cannot be undone!
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 12,
          justifyContent: 'center',
        }}
      >
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            await submitAction(formData);
          }}
        >
          <input hidden={true} name='id' defaultValue={id} />
          <Button
            className='submitButton'
            text='Yes! Delete email template!'
            type='submit'
          />
        </form>
        <Button
          className='button'
          text='Cancel'
          onClick={() => openModal(false)}
          type='button'
        />
      </div>
    </div>
  );

  return (
    <div>
      {modal && (
        <Modal
          type='warning'
          content={modalContent}
        />
      )}
      <Button
        className='textButton'
        text='Delete'
        onClick={() => openModal(true)}
        startIcon={<DeleteIcon />}
        type='button'
      />
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
