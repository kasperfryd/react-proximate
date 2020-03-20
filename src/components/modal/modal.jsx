import React, { useRef, useContext, useState, useEffect } from "react";
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import ReactDOM from "react-dom";
import Style from '../styles/modal.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalContext = React.createContext();

// Modal provider. Tager imod children nodes (andre components osv) som props
export function ModalProvider({ children }) {
  // Sæt reference til modal og state for context
  const modalRef = useRef();
  const [context, setContext] = useState();

  // make sure re-render is triggered after initial
  // render so that modalRef exists
  useEffect(() => {
    setContext(modalRef.current);
  }, []);

 // returner en context.provider med indhold children, og en div, med ref til modalRef
  return (
    <div className={Style.container}>
      <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </div>
  );
}

// Selve modalen som tager imod onClose, children og props og returnere et nyt
// React portal element
export function Modal({ onClose, children, ...props }) {
  const modalNode = useContext(ModalContext);

  return modalNode
    ? ReactDOM.createPortal(
        <div className={Style.overlay}>
          <div className={Style.dialog} {...props}>
            <FontAwesomeIcon className={Style.icon} icon={faTimes} onClick={onClose}></FontAwesomeIcon>
            {children}
          </div>
        </div>,
        modalNode
      )
    : null;
}
