import { ReactNode } from 'react';
import styles from './button.module.scss';

interface ButtonProps {
  id?: string;
  className: 'button' | 'textButton' | 'submitButton' | 'deleteButton' | 'primaryTextButton';
  startIcon?: ReactNode;
  type: 'button' | 'submit' | 'reset';
  text?: string;
  onClick?: () => void;
  component?: ReactNode;
}

export default function Button({
  id,
  className,
  startIcon,
  type,
  text,
  onClick,
  component,
}: ButtonProps) {
  const CLASS_NAME = {
    button: styles.button,
    primaryTextButton: styles.primaryTextButton,
    textButton: styles.textButton,
    submitButton: styles.submitButton,
    deleteButton: styles.deleteButton,
  };
  return (
    <button id={id} className={CLASS_NAME[className]} type={type} onClick={onClick}>
      <span>{startIcon}</span>
      {component ? <span>{component}</span> : <span>{text}</span>}
    </button>
  );
}
