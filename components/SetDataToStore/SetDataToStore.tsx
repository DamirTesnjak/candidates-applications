'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAppDispatch } from '@/lib/hooks';
import { loadUpdateCandidate } from '@/lib/features/candidate/candidateSlice';
import { loadUpdateHrUser } from '@/lib/features/hrUser/hrUserSlice';
import { ISetDataToStoreProps } from '@/types/SetDataToStoreProps';
import { DATABASES } from '@/constants/constants';
import Modal from '@/components/Modal/Modal';
import ModalContentMessage from '@/components/Modal/ModalContentMessage/ModalContent';
import { IShowModal } from '@/types/ShowModalType';

export default function SetDataToStore({
  data,
  response,
  databaseName,
}: ISetDataToStoreProps) {
  const dispatch = useAppDispatch();

  const [showModal, setShowModal] = useState<IShowModal>({
    success: false,
    error: false,
  });

  const actionState = useCallback(() => {
    if (databaseName === DATABASES.hrUsers) {
      dispatch(loadUpdateHrUser(data));
    }

    if (databaseName === DATABASES.candidates) {
      dispatch(loadUpdateCandidate(data));
    }
  }, [data, databaseName, dispatch]);

  useEffect(() => {
    if (data) {
      actionState();
    }
  }, [actionState, data]);

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

  return <div>
    {showModal.error && (
      <Modal
        type='error'
        content={
          <ModalContentMessage
            response={response!}
            setShowModal={setShowModal}
          />
        }
      />
    )}
  </div>;
}
