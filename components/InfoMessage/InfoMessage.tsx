import styles from "./infoMessage.module.scss";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function InfoMessage({text}: {text: string}) {
    return (
        <div className={styles.infoMessage}>
            <div className={styles.messageIcon}><InfoOutlinedIcon /></div>
            <div>{text}</div>
        </div>
    )
}