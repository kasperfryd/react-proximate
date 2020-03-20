import React, {useState} from 'react';
import {ModalProvider, Modal} from '../modal/modal';
import Style from '../styles/content.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCompass } from '@fortawesome/free-regular-svg-icons'
import { faBars, faUndo, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Markup } from 'interweave';
import MapComponent from '../MapComponent/map';


function WikiArray(props) {
    console.log(props);
    let wikiArr = [];

    const [active, setActive] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState();
    const [targetPos, setTargetPos] = useState();

    // Variables needed for map component
    const myLat = props.myLat;
    const myLon = props.myLon;
    const myPos = {lat:myLat, lon:myLon};
    const myLocation = props.area.road + " - " + props.area.city + ", " + props.area.suburb;
    

    function ChangeSlide(num) {
        if (num === -1) {
            if (active === 0) {
                console.log("Reached the bottom")
            }
            else {
                setActive(active + num)
            }
        }
        if (num === 1) {
            if (active < wikiArr.length - 1) {
                setActive(active + num)
            }
            else {
                console.log("Reached the top")
            }
        }
    }

    const modalMap = async(title) => {
        let url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=coordinates&format=json&titles=${title}`
        try {
                const req = await fetch(url);
                const res = await req.json();
                const posData = Object.entries(res);
                const fposData = Object.entries(posData[1][1].pages);
                let lat = fposData["0"][1].coordinates["0"].lat;
                let lon = fposData["0"][1].coordinates["0"].lon;
                let targetPos = {lat: lat, lon: lon};
                setTargetPos(targetPos)
                console.log(fposData);
        } catch (error) {
            console.log(error);
        }

        setModalData(<MapComponent></MapComponent>);
        setIsModalOpen(true);
    }

    const modalAction = async(id) => {
        
        const url = `http://en.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&format=json&exintro=&pageids=${id}`

        try {
            const req = await fetch(url);
            const res = await req.json();
            const data = Object.entries(res);
            const fData = Object.entries(data[2][1].pages)
            const mData = {
               extract: fData['0'][1].extract,
               title: fData['0'][1].title
            }
            setModalData(mData);
        }
    
        catch (error) {
        console.log(error)
        }

        setIsModalOpen(true) 
    }

    if (props.apiData && props.apiData.query && props.apiData.query.pages) {
       wikiArr = Object.entries(props.apiData.query.pages).reduce((acc, item) => {
            if (item[1].thumbnail) {
                if (item[1].thumbnail.width >= 2000) {
                    acc.push(
                        <ModalProvider>
                        <div className={Style.contentContainer} key={item[1].pageid} style={{ backgroundImage: `url( ${item[1].thumbnail.source})` }}>
                            <div className={Style.contentNavigator}>
                                <h2 className={Style.contentHeading}> {item[1].title} </h2>
                                <div className={Style.iconContainer}>
                                    <div className={Style.iconRound}><FontAwesomeIcon className={Style.icon} icon={faStar} /></div>
                                    <div onClick={() => modalMap(item[1].title)}  className={Style.iconRound}><FontAwesomeIcon className={Style.icon} icon={faCompass} /></div>
                                    <div onClick={() => modalAction(item[1].pageid)} className={Style.iconRound}>
                                    <FontAwesomeIcon className={Style.icon} icon={faBars} />
                                    </div>
                                        { modalData && isModalOpen && 
                                        ( <Modal onClose={() => setIsModalOpen(false)}> 
                                        {modalData.extract &&  <Markup content={modalData.extract}></Markup>}
                                        {!modalData.extract && <MapComponent myPos={myPos} targetPos={targetPos} myLocation={myLocation} targetLocation={item[1].title}></MapComponent>}
                                        </Modal>)
                                        }
                                    <a href="/" className={Style.iconRound}><FontAwesomeIcon className={Style.icon} icon={faUndo} /></a>
                                </div>
                                <div className={Style.linkContainer}>
                                    <a key={item[1].pageid+1} className={Style.aLinkLeft} href={"http://en.wikipedia.org/?curid=" + item[1].pageid}>Read more |</a>
                                    <a key={item[1].pageid+2}className={Style.aLink} href="/"> Get directions</a>
                                </div>
                                <div className={Style.cycleContainer}>
                                <div onClick={() => ChangeSlide(-1)} className={Style.iconRoundLeft}><FontAwesomeIcon className={Style.icon} icon={faArrowLeft} /></div>
                                <div onClick={() => ChangeSlide(+1)} className={Style.iconRoundRight}><FontAwesomeIcon className={Style.icon} icon={faArrowRight} /></div>
                                </div>
                            </div>
                        </div>
                    </ModalProvider>
                    )
                }
            }
            return acc;
        }, [])
    }
    return wikiArr[active];
}

export default WikiArray;