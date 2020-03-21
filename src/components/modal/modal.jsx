import React, { useRef, useContext, useState, useEffect } from "react";
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import ReactDOM from "react-dom";
import Style from '../styles/modal.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ModalContext = React.createContext();

// Modal provider. Accepts children as props
export function ModalProvider({ children }) {
  // Set reference
  const modalRef = useRef();
  const [context, setContext] = useState();

  // make sure re-render is triggered after initial
  // render so that modalRef exists
  useEffect(() => {
    setContext(modalRef.current);
  }, []);

 // return context provider with value context and children as child.
  return (
    <div className={Style.container}>
      <ModalContext.Provider value={context}>{children}</ModalContext.Provider>
      <div ref={modalRef} />
    </div>
  );
}

// The modal, accepts onClose function, children optional props
// React portal element
export function Modal({ onClose, children, ...props }) {
  const modalNode = useContext(ModalContext);

  return modalNode
    ? ReactDOM.createPortal(
        <div className={Style.overlay}>
          <div className={Style.dialog} {...props}>
            <FontAwesomeIcon className={Style.icon} icon={faWindowClose} onClick={onClose}></FontAwesomeIcon>
            {children}
          </div>
        </div>,
        modalNode
      )
    : null;
}
