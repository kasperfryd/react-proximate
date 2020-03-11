import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import modalStyle from '../modal/modal.module.scss'
import Parse from 'html-react-parser';


const Modal = (isShowing, hide, id) => {
 
    // This becomes undefined? Why?
    const [modalContent, setModalContent] = useState(null)   
    // NEED TO PASS ID OF PARENT DIV FROM HOME COMPONENT INTO THIS FUNCTION 
    async function fetchModalContent() {
        let url = 'https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=Stack%20Overflow'
        try {
            const req = await fetch(url)
            const res = await req.json()
            const converted = await Object.entries(res)[1][1].pages;
            const newEl = await Object.entries(converted);
            setModalContent(newEl[0][1].extract);
        } catch (error) {
            console.log(error);
        }
    }
    if (modalContent) {
        //console.log(Parse(modalContent));
    }
    
    if (isShowing.isShowing === true) {
        console.log(id);
        if (!modalContent) {
            fetchModalContent();
            //console.log(modalContent)
        }
        
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
                            {modalContent}
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