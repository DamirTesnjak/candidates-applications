'use client'

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
    const elRef = useRef(null);
    if (!elRef.current) {
        elRef.current = document.createElement("div");
    }

    useEffect(() => {
        const modalRoot = document.getElementById("modal")!;
        modalRoot.appendChild(elRef.current);
        return () => modalRoot.removeChild(elRef.current);
    }, []);

    return createPortal(
        <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            backgroundColor: "beige",
            zIndex: 1}}>
                {children}
        </div>,
        elRef.current);
};

export default Modal;
