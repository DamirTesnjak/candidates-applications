import { ReactNode } from 'react';
import Link from 'next/link';
import AddIcon from '@mui/icons-material/Add';
import Button from '@/UI/Button/Button';
import styles from '../../../styles/global/globals.module.scss';

export default async function CandidatesLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={styles.container}>
      <h3>Candidates</h3>
      <Link href={`/app/${locale}/candidates/createCandidate`}>
        <Button
          className='button'
          text={translation("candidates.addNewCandidate")}
          startIcon={<AddIcon />}
          type='button'
        />
      </Link>
      <div>{children}</div>
    </div>
  );
}
