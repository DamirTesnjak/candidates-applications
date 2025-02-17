import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import styles from './infoMessage.module.scss';

export default function InfoMessage({ text }: { text: string }) {
  return (
    <div id="message" className={styles.infoMessage}>
      <div className={styles.messageIcon}>
        <InfoOutlinedIcon />
      </div>
      <div>{text}</div>
    </div>
  );
}
