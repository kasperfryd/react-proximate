import React, {useState} from 'react';
import {ModalProvider, Modal} from '../modal/modal';
import Style from '../styles/content.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCompass, faQuestionCircle } from '@fortawesome/free-regular-svg-icons'
import { faBars, faHome, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { Markup } from 'interweave';
import MapComponent from '../map/map';

// Creates and returns the wikipedia articles 
function WikiArray(props) {
    console.log(props);
    let wikiArr = [];

    // Set states
    const [active, setActive] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalData, setModalData] = useState();
    const [targetPos, setTargetPos] = useState();

    // Variables needed for map component
    const myLat = props.myLat;
    const myLon = props.myLon;
    const myPos = {lat:myLat, lon:myLon};
    const myLocation = props.area.road + " - " + props.area.city + ", " + props.area.suburb;
    
    // Function to change the current article
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

    // Function to fetch the current articles gps location
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

    // Function to fetch the current articles exempt from wikipedia
    const modalFetch = async(id) => {
        
        const url = `https://en.wikipedia.org/w/api.php?origin=*&action=query&prop=extracts&format=json&exintro=&pageids=${id}`

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
            setIsModalOpen(true) 
        }
        
        catch (error) {
            console.log(error)
        }
        
    }

    // Function to return about section, used as a child of modal
    const modalAbout = () => {

        const modalMsg = {
                        about: 
                        <div className={Style.aboutContainer}>
                            <h3 className={Style.aboutHeading}>About</h3>
                            <p>Proximate can help you find nearby points of interest, within a 10 km range. Browse through high quality images of all the places near you, and when something peaks your interest, you can get a quick exempt of the place or go straight to the wikipedia site for more info</p>
                            <p>This app would not have been possible without all the awesome work made by:</p>
                            <div>
                                <ul>
                                    <li className={Style.aboutList}>Nominatim: <a href="http://nominatim.org/">http://nominatim.org/</a></li>
                                    <li className={Style.aboutList}>Wikidata: <a href="https://www.wikidata.org/wiki/Wikidata:Main_Page">https://www.wikidata.org/</a></li>
                                    <li className={Style.aboutList}>OpenStreetMap: <a href="https://www.openstreetmap.org/copyright">https://www.openstreetmap.org/</a></li>
                                    <li className={Style.aboutList}>React-leaflet: <a href="https://react-leaflet.js.org/" >https://react-leaflet.js.org/</a></li>
                                    <li className={Style.aboutList}>Leaflet: <a href="https://leafletjs.com/" >https://leafletjs.com/</a></li>
                                    <li className={Style.aboutList}>FontAwesome: <a href="https://fontawesome.com/" >https://fontawesome.com/</a></li>
                                </ul>
                            </div>
                        </div>,}

        setModalData(modalMsg);
        setIsModalOpen(true);
    }

    // If the fetch was successfull, loop through all data, create each page with content, and insert it into an array. 
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
                                    <div onClick={() => modalAbout()} className={Style.iconRound}><FontAwesomeIcon className={Style.icon} icon={faQuestionCircle} /></div>
                                    <div onClick={() => modalMap(item[1].title)}  className={Style.iconRound}><FontAwesomeIcon className={Style.icon} icon={faCompass} /></div>
                                    <div onClick={() => modalFetch(item[1].pageid)} className={Style.iconRound}>
                                    <FontAwesomeIcon className={Style.icon} icon={faBars} />
                                    </div>
                                        {modalData && isModalOpen && 
                                        (<Modal onClose={() => setIsModalOpen(false)}> 
                                        {!modalData.about && !modalData.extract &&<MapComponent myPos={myPos} targetPos={targetPos} myLocation={myLocation} targetLocation={item[1].title}></MapComponent>}
                                        {!modalData.about && modalData.extract && <Markup content={modalData.extract}></Markup>}
                                        {modalData.about}
                                        </Modal>)
                                        }
                                    <a href="/react-proximate" className={Style.iconRound}><FontAwesomeIcon className={Style.icon} icon={faHome} /></a>
                                </div>
                                <div className={Style.linkContainer}>
                                    <a key={item[1].pageid+1} className={Style.aLinkLeft} href={"http://en.wikipedia.org/?curid=" + item[1].pageid}>Read more |</a>
                                    <p key={item[1].pageid+2}className={Style.aLink} onClick={() => modalMap(item[1].title)} curser="pointer"> Get directions</p>
                                </div>
                                <div className={Style.cycleContainer}>
                                <div onClick={() => ChangeSlide(-1)} className={Style.iconRoundLeft}><FontAwesomeIcon className={Style.icon} icon={faChevronLeft} /></div>
                                <div onClick={() => ChangeSlide(+1)} className={Style.iconRoundRight}><FontAwesomeIcon className={Style.icon} icon={faChevronRight} /></div>
                                </div>
                            </div>
                        </div>
                    </ModalProvider>
                    )
                }
            }
            return acc;
        }, [])
        return wikiArr[active];
    }
    else{
        return(
            <div><h2>Sorry.. No points of interest were found around you. 
                </h2><p>This app uses Wikidata to get content. If you think something important or interesting is going on around you and it is not already on Wikipedia, consider adding it as an article to Wikipedia yourself.</p></div>
        )
    }
}

export default WikiArray;