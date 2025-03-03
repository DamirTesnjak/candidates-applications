'use client';

import { useActionState, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import Input from '@/UI/Input/Input';
import Button from '@/UI/Button/Button';
import Modal from '@/components/Modal/Modal';
import StatusDisplay from '@/UI/StatusDisplay/StatusDisplay'
import ModalContentMessage from '@/components/Modal/ModalContentMessage/ModalContent';
import { IShowModal } from '@/types/ShowModalType';
import { IPrevState } from '@/utils/types/prevState';
import flattenObject from '@/utils/flattenObject';
import { useAppSelector } from '@/lib/hooks';
import { initialStateHrUser } from '@/lib/features/hrUser/hrUserSlice';
import { initialStateCandidate } from '@/lib/features/candidate/candidateSlice';
import { initialStateCompanyEmailConfigs } from '@/lib/features/companyEmailConfigs/companyEmailConfigsSlice';
import styles from './editForm.module.scss';

export interface IEditFormProps {
  id?: string;
  serverAction?: (
    prevState: IPrevState,
    formData: FormData,
  ) => Promise<Partial<IPrevState>>;
  stateModel:
    | typeof initialStateCandidate
    | typeof initialStateHrUser
    | typeof initialStateCompanyEmailConfigs;
  storeReducerName: string;
  editable?: boolean;
  newProfile?: boolean;
  showUploadCVButton?: boolean;
  showUploadPictureButton?: boolean;
  hrForm?: boolean;
}

export default function EditForm(props: IEditFormProps) {
  const {
    id,
    serverAction,
    stateModel,
    storeReducerName,
    editable,
    newProfile,
    showUploadCVButton,
    showUploadPictureButton,
  } = props;
  const translation = useTranslations("editForm");
  const stateModelKeyAndValues = useAppSelector(
    (state) => state[storeReducerName],
  );

  // default dummy action when 'server action' is undefined
  const defaultAction = async (prevState: IPrevState, formData: FormData) => {
    return {
      ...formData,
      prevState,
    }; // Or handle it in a meaningful way
  };

  const [response, formAction] = useActionState<Partial<IPrevState>, FormData>(
    serverAction || defaultAction,
    {},
  );
  const [showModal, setShowModal] = useState<IShowModal>({
    success: false,
    error: false,
  });

  const stateModelKeys = Object.keys(flattenObject(stateModel));
  const fieldsToDisplayKeys = stateModelKeys.filter(
    (stateModelKey) =>
      stateModelKey !== 'data' &&
      stateModelKey !== 'contentType' &&
      stateModelKey !== 'id',
  );

  const flattenedObjects = (stateModelKey: string) => {
    return newProfile
      ? flattenObject(initialStateCandidate)[stateModelKey]
      : flattenObject(stateModelKeyAndValues)[stateModelKey];
  };

  useEffect(() => {
    if (
      response &&
      (response.errorMessage ||
        response.errorFieldValidation?.profilePicture ||
        response?.errorFieldValidation?.file ||
        response.success)
    ) {
      setShowModal({
        success: response.success,
        error: response.error,
      });
    }
  }, [response]);

  const displayDefaultValue = (field: string) => {
    if (response && response.prevState) {
      return response.prevState[field];
    }
    return flattenedObjects(field);
  };

  return (
    <div id="form">
      <form action={formAction}>
        {id ? <input name='id' type='text' value={id} readOnly hidden /> : null}
        {fieldsToDisplayKeys.map((stateModelKey) => {
          if (
            stateModelKey === 'archived' ||
            stateModelKey === 'employed' ||
            stateModelKey === 'rejected' ||
            stateModelKey === 'fired'
          ) {
            return (
              <div key={stateModelKey}>
                { !editable && <StatusDisplay
                  className='standard'
                  flow='flowRow'
                  label={translation(stateModelKey)}
                  icon={flattenedObjects(stateModelKey) ? <TaskAltIcon /> : <RadioButtonUncheckedIcon />}
                /> }
              </div>
            );
          } else {
            return (
              <div key={stateModelKey}>
                <Input
                  className='standard'
                  flow='flowRow'
                  label={translation(stateModelKey)}
                  name={stateModelKey}
                  type={stateModelKey === 'password' ? 'password' : 'text'}
                  readOnly={!editable}
                  errorMessage={
                    response && response.errorFieldValidation
                      ? response.errorFieldValidation[stateModelKey]
                      : null
                  }
                  defaultValue={displayDefaultValue(stateModelKey)!}
                />
              </div>
            );
          }
        })}
        {editable && (
          <div className={styles.buttonsContainer}>
            {showUploadPictureButton && (
              <Input
                className='uploadButton'
                flow='flowRow'
                label={translation("profilePicture")}
                name='profilePicture'
                type='file'
              />
            )}
            {showUploadCVButton && (
              <Input
                className='uploadButton'
                flow='flowRow'
                label={translation("cvFile")}
                name='file'
                type='file'
              />
            )}
            <Button
              className='submitButton'
              type='submit'
              text={translation("saveChanges")}
            />
          </div>
        )}
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
