import { ReactNode } from 'react';
import {getTranslations} from 'next-intl/server';
import {Link} from '@/i18n/routing';
import AddIcon from '@mui/icons-material/Add';
import Button from '@/UI/Button/Button';
import styles from '../../../styles/global/globals.module.scss';

export default async function CandidatesLayout({
  children,
}: {
  children: ReactNode;
}) {

  const translation = await getTranslations("candidates");

  return (
    <div id="container" className={styles.container}>
      <h3>{translation("candidates")}</h3>
      <Link href={`/candidates/createCandidate`}>
        <Button
          className='button'
          text={translation("addNewCandidate")}
          startIcon={<AddIcon />}
          type='button'
        />
      </Link>
      <div>{children}</div>
    </div>
  );
}
