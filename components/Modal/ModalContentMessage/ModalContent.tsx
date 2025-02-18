import { useTranslations } from 'next-intl';
import { Dispatch, SetStateAction } from 'react';
import Button from '@/UI/Button/Button';
import { IShowModal } from '@/types/ShowModalType';
import { IPrevState } from '@/utils/types/prevState';

export interface IModalContentMessageProps {
  response: Partial<IPrevState> | null;
  setShowModal: Dispatch<SetStateAction<IShowModal>>;
}

export default function ModalContentMessage({
  response,
  setShowModal,
}: IModalContentMessageProps) {
  const translation = useTranslations('modal');
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 12,
      }}
    >
      <div>
        {response &&
        response.errorFieldValidation &&
        response.errorFieldValidation.profilePicture
          ? response.errorFieldValidation.profilePicture
          : null}
        {response &&
        response.errorFieldValidation &&
        response.errorFieldValidation.file
          ? response.errorFieldValidation.file
          : null}
        {response && response.errorMessage ? response.errorMessage : null}
        {response && response.successMessage ? response.successMessage : null}
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 12,
          justifyContent: 'center',
        }}
      >
        <Button
          className='button'
          text={translation("ok")}
          onClick={() =>
            setShowModal({
              success: false,
              error: false,
            })
          }
          type='button'
        />
      </div>
    </div>
  );
}
