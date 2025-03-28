'use client';

import {useTranslations} from 'next-intl';
import { useCallback, useState, useTransition, useEffect } from 'react';
import Button from '@/UI/Button/Button';
import SelectInput from '@/UI/SelectInput/SelectInput';
import { getEmailTemplates } from '@/app/_actions/getEmailTemplates';
import { mapEmailTemplates } from '@/app/_actions/mapEmailTemplates';
import { IPrevState } from '@/utils/types/prevState';
import { IShowModal } from '@/types/ShowModalType';
import Modal from '@/components/Modal/Modal';
import ModalContentMessage from '@/components/Modal/ModalContentMessage/ModalContent';
import { PAGES as TPages } from '@/messages/constants/constants';
import styles from '../../../../styles/global/globals.module.scss';
import { useAppSelector } from '@/lib/hooks';

export interface IEmailTemplate {
  emailType: string;
  emailText: string;
}

export default function MappedEmailsConfigurationPage() {
  const translation = useTranslations(TPages.mapTemplateMessages);
  const tutorialRunning = useAppSelector((state) => state.tutorialData.tutorialRunning);
  const [, startTransition] = useTransition();
  const [emailTemplates, setEmailTemplates] = useState<IEmailTemplate[]>([]);
  const [response, setResponse] = useState<IPrevState>({});

  const [showModal, setShowModal] = useState<IShowModal>({
    success: false,
    error: false,
  });

  const getMapEmailTemplates = useCallback(async () => {
    const response = await getEmailTemplates();
    const responseParsed = JSON.parse(response);

    if (responseParsed.emailTemplates) {
      setEmailTemplates(responseParsed.emailTemplates);
    } else {
      setResponse(responseParsed);
    }
  }, []);

  useEffect(() => {
    if (emailTemplates.length === 0) {
      getMapEmailTemplates();
    }
  }, [emailTemplates.length, getMapEmailTemplates]);

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

  const selectDropdownEmailList =
    emailTemplates?.map((emailTemplate) => ({
      id: emailTemplate.emailType,
      text: emailTemplate.emailType,
      value: emailTemplate.emailType,
    })) || [];

  const submitAction = async (formData: FormData) => {
    startTransition(async () => {
      const results = await mapEmailTemplates(formData);
      setResponse(results);
    });
  };

  return (
    <div className={styles.container}>
      <h3>{translation('mapEmailTemplateMessages')}</h3>
      <form
        id="form"
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await submitAction(formData);
        }}
      >
        <SelectInput
          label={translation('archive')}
          listDropdown={selectDropdownEmailList}
          placeholder={translation("selectEmailTemplate")}
          name='archive'
        />
        <SelectInput
          label={translation('hire')}
          listDropdown={selectDropdownEmailList}
          placeholder={translation("selectEmailTemplate")}
          name='hire'
        />
        <SelectInput
          label={translation('reject')}
          listDropdown={selectDropdownEmailList}
          placeholder={translation("selectEmailTemplate")}
          name='reject'
        />
        <SelectInput
          label={translation('fire')}
          listDropdown={selectDropdownEmailList}
          placeholder={translation("selectEmailTemplate")}
          name='fire'
        />
        <Button className='submitButton' type='submit' text={translation("saveChanges")} />
      </form>
      {showModal.error && !tutorialRunning && (
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
      {showModal.success && !tutorialRunning && (
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
