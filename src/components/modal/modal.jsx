import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import modalStyle from '../modal/modal.module.scss'
import ModalContent from '../modal/modalContent'


const Modal = (isShowing, hide, id) => {

     console.log(id);
    // NEED TO PASS ID OF PARENT DIV FROM HOME COMPONENT INTO THIS FUNCTION 
    // console.log(id) & console.log(thisId) upon import returns undefined?

    if (isShowing.isShowing){
        return (
            ReactDOM.createPortal(
                <React.Fragment>
                    <div className={modalStyle.modalOverlay} />
                    <div className={modalStyle.modalWrapper} aria-modal aria-hidden tabIndex={-1} role="dialog">
                        <div className={modalStyle.modal}>
                            <div className={modalStyle.modalHeader}>
                                <button type="button" className={modalStyle.modalCloseButton} data-dismiss="modal" aria-label="Close" onClick={() => hide}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <ModalContent></ModalContent>
                        </div>
                    </div>
                </React.Fragment>, document.body
            )
        )
            }

    if (isShowing.isShowing === false) {
        return (
            null
        )
    }
}

export default Modal;