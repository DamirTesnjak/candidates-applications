'use client';

import { useCallback, useState, useTransition, useEffect } from 'react';
import Button from '@/UI/Button/Button';
import SelectInput from '@/UI/SelectInput/SelectInput';
import { getEmailTemplates } from '@/app/_actions/getEmailTemplates';
import { mapEmailTemplates } from '@/app/_actions/mapEmailTemplates';
import { IPrevState } from '@/utils/types/prevState';
import { IShowModal } from '@/types/ShowModalType';
import Modal from '@/components/Modal/Modal';
import ModalContentMessage from '@/components/Modal/ModalContentMessage/ModalContent';
import styles from '../../../../styles/global/globals.module.scss';

export interface IEmailTemplate {
  emailType: string;
  emailText: string;
}

export default function MappedEmailsConfigurationPage() {
  const [isPending, startTransition] = useTransition();
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
      <h3>Map email template messages</h3>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          await submitAction(formData);
        }}
      >
        <SelectInput
          label='Archive'
          listDropdown={selectDropdownEmailList}
          placeholder={translation("settings.mapTemplateMessages.selectEmailTemplate")}
          name='archive'
        />
        <SelectInput
          label='Hire'
          listDropdown={selectDropdownEmailList}
          placeholder={translation("settings.mapTemplateMessages.selectEmailTemplate")}
          name='hire'
        />
        <SelectInput
          label='Reject'
          listDropdown={selectDropdownEmailList}
          placeholder={translation("settings.mapTemplateMessages.selectEmailTemplate")}
          name='reject'
        />
        <Button className='submitButton' type='submit' text={translation("settings.mapTemplateMessages.saveChanges")} />
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
