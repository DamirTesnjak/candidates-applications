import styles from "../../../styles/global/globals.module.scss"
import { createCompanyEmailConfiguration } from "@/app/_actions/createCompanyEmailConfiguration";
import { STORE_REDUCER_NAME } from '@/constants/constants';
import EditForm from '@/components/EditForm/EditForm';
import { initialStateCompanyEmailConfigs } from '@/lib/features/companyEmailConfigs/companyEmailConfigsSlice';

export default function companyEmailConfigurationPage() {
    return (
        <div className={styles.container}>
            <h3>Company email configuration</h3>
            <EditForm
              serverAction={createCompanyEmailConfiguration}
              stateModel={initialStateCompanyEmailConfigs}
              storeReducerName={STORE_REDUCER_NAME.companyEmailConfigs}
              editable={true}
              showUploadButton={false}
            />
        </div>
    )
}