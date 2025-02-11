'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styles from './modal.module.scss';

export interface IModalProps {
  type: string;
  content: ReactNode;
}

export interface ITitlePerType {
  [x: string]: string;
  warning: 'Warning!';
  error: 'Error!';
  success: 'Success!';
}

const Modal = ({ content, type }: IModalProps) => {
  const elRef = useRef<HTMLElement | null>(null);

  const titlePerType: ITitlePerType = {
    warning: 'Warning!',
    error: 'Error!',
    success: 'Success!',
  };

  if (!elRef.current) {
    elRef.current = document.createElement('div');
  }

  useEffect(() => {
    const modalRoot = document.getElementById('modal')!;
    modalRoot.appendChild(elRef.current!);
    const removeChild = () => {
      modalRoot.removeChild(elRef.current!);
    };
    return removeChild;
  }, []);

  return createPortal(
    <div className={styles.modal}>
      <div className={styles.window}>
        <div className={styles.title}>{titlePerType[type]}</div>
        <div className={styles.content}>{content}</div>
      </div>
      ,
    </div>,
    elRef.current,
  );
};

export default Modal;
