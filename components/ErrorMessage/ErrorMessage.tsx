import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import styles from './errorMessage.module.scss';

export default function ErrorMessage({ text }: { text: string }) {
  return (
    <div className={styles.errorMessage}>
      <div className={styles.messageIcon}>
        <ErrorOutlinedIcon />
      </div>
      <div>{text}</div>
    </div>
  );
}
