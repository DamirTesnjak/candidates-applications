import { ReactNode } from 'react';
import styles from './button.module.scss';

interface ButtonProps {
  className: 'button' | 'textButton' | 'submitButton' | 'deleteButton';
  startIcon?: ReactNode;
  type: 'button' | 'submit' | 'reset';
  text?: string;
  onClick?: () => void;
}

export default function Button({
  className,
  startIcon,
  type,
  text,
  onClick,
}: ButtonProps) {
  const CLASS_NAME = {
    button: styles.button,
    textButton: styles.textButton,
    submitButton: styles.submitButton,
    deleteButton: styles.deleteButton,
  };
  return (
    <button className={CLASS_NAME[className]} type={type} onClick={onClick}>
      <span>{startIcon}</span>
      <span>{text}</span>
    </button>
  );
}
