import styles from './statusDisplay.module.scss';
import { ReactNode } from 'react';

interface IStatusDisplayProps {
  label?: string;
  className: 'standard';
  flow: 'flowRow' | 'flowColumn';
  icon?: ReactNode;
}

export default function StatusDisplay({
  label,
  flow,
  icon,
  className
}: IStatusDisplayProps) {
  const CLASS_NAME = {
    input: styles.input,
    standard: styles.standard,
    flowColumn: styles[flow],
    flowRow: styles[flow],
  };

  return (
    <div className={CLASS_NAME[flow]}>
      <label
        className={styles.label}
      >
        {label}
      </label>
      <div className={CLASS_NAME[className]}>
        {icon}
      </div>
    </div>
  );
}
