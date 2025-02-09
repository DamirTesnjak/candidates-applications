import Button from '@/UI/Button/Button';
import { Dispatch, SetStateAction } from 'react';
import { IShowModal } from '@/types/ShowModalType';
import { IFormDataType } from '@/utils/types/formDataType';

export interface IModalContentMessageProps {
  response: {
    errorMessage?: string;
    error?: boolean;
    successMessage?: string;
    success?: boolean;
    errorFieldValidation?: {
      [p: string]: string;
    };
    prevState?: IFormDataType;
  } | null
    setShowModal:  Dispatch<SetStateAction<IShowModal>>
}

export default function ModalContentMessage({response, setShowModal}: IModalContentMessageProps) {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      gap: 12,
    }}>
      <div>
        { response && response.errorFieldValidation && response.errorFieldValidation.profilePicture
          ? response.errorFieldValidation.profilePicture
          : null
        }
        { response && response.errorMessage ? response.errorMessage : null }
        { response && response.successMessage ? response.successMessage : null }
      </div>
      <div style={{
        display: "flex",
        flexDirection: "row",
        gap: 12,
        justifyContent: "center",
      }}>
        <Button
          className="button"
          text="OK"
          onClick={() => setShowModal({
            success: false,
            error: false,
          })}
          type="button"
        />
      </div>
    </div>
  )
}