import React, {useState} from 'react';
import useModal from '../modal/useModal'

function ModalContent(){
    const [modalContent, setModalContent] = useState(null)   
    
    // HER SKAL JEG BRUGE ID
    const {thisId} = useModal();
    console.log(thisId)

    fetchModalContent();

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

    return (
        <div>{modalContent}</div>
    )
}

export default ModalContent