'use client'

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import styles from "./modal.module.scss";

const Modal = ({ content, type }) => {
    const elRef = useRef(null);

    const titlePerType =  {
        warning: "Warning",
    }

    if (!elRef.current) {
        elRef.current = document.createElement("div");
    }

    useEffect(() => {
        const modalRoot = document.getElementById("modal")!;
        modalRoot.appendChild(elRef.current);
        return () => modalRoot.removeChild(elRef.current);
    }, []);

    return createPortal(
        <div class={styles.modal}>
            <div className={styles.window}>
                <div className={styles.title}>
                    {titlePerType[type]}
                </div>
                <div className={styles.content}>
                    {content}
                </div>
            </div>,
        </div>,
        elRef.current);
};

export default Modal;
