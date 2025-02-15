import {getTranslations} from 'next-intl/server';
import { createCompanyEmailConfiguration } from '@/app/_actions/createCompanyEmailConfiguration';
import { STORE_REDUCER_NAME } from '@/constants/constants';
import EditForm from '@/components/EditForm/EditForm';
import { initialStateCompanyEmailConfigs } from '@/lib/features/companyEmailConfigs/companyEmailConfigsSlice';
import { PAGES as TPages } from '@/messages/constants/constants';
import styles from '../../../../styles/global/globals.module.scss';

export default async function companyEmailConfigurationPage() {
  const translation = await getTranslations(TPages.companyEmailConfiguration);

  return (
    <div className={styles.container}>
      <h3 id="companyEmailConfiguration-title">{translation("companyEmailConfiguration")}</h3>
      <EditForm
        serverAction={createCompanyEmailConfiguration}
        stateModel={initialStateCompanyEmailConfigs}
        storeReducerName={STORE_REDUCER_NAME.companyEmailConfigs}
        editable
      />
    </div>
  );
}
