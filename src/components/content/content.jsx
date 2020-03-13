import React, { useState, Component, } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCompass } from '@fortawesome/free-regular-svg-icons'
import { faBars, faUndo, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

//Modal
import Modal from "../modal/modal";
import useModal from '../modal/useModal';

import Style from './content.module.scss';

function Content() {

    const [apiData, setApiData] = useState(null)
    const [range, setRange] = useState(10)
    //const [cityName, setCityName] = useState(null)
    const [active, setActive] = useState(0);
    
    // MODAL STATE
    const {isShowing, toggle, thisId, setId} = useModal();
    
    const stateChange = (event) => {
        setRange(event.target.value);
        console.log(range);
    }

    const success = (pos) => {
        let position = pos.coords;
        lat = position.latitude;
        long = position.longitude;
        console.log("lat is " + lat + "long is " + long);
    }

    const error = (error) => {
        console.log(error);
    }

    let lat;
    let long;

    navigator.geolocation.getCurrentPosition(success, error);


    const fetchAll = () => {
        fetchApiData();
        fetchGeoData();
    }

    const fetchGeoData = async () => {
       /*  let geoURL = `https://geocode.xyz/${lat},${long}?json=1'`;

        try {
            const georeq = await fetch(geoURL);
            const geores = await georeq.json();
            setCityName(geores);
        } catch (error) {
            console.log(error)
        } */
    }

    const fetchApiData = async () => {
        let url = `https://en.wikipedia.org/w/api.php?&format=json&origin=*&action=query&generator=geosearch&prop=coordinates|pageimages&piprop=thumbnail&pithumbsize=2000&ggscoord=${lat}|${long}&ggsradius=${range * 1000}&ggslimit=50`;

        try {

            const req = await fetch(url);
            const res = await req.json();
            setApiData(res);
            //console.log(apiData);
        }

        catch (error) {
            console.log(error)
        }
    }

    function changeSlide(num){

        if (num === -1){
           if (active === 0){
                console.log("Reached the bottom")
            }
            else{
            setActive(active +num)
            }
        }
        if (num === 1){
            if (active < WikiArray().length -1){
                setActive(active + num)
            }
            else{
                console.log("Reached the top")
            }
        }
    }

    const WikiArray = (id) =>{
        if (apiData && apiData.query && apiData.query.pages){
           return Object.entries(apiData.query.pages).reduce((acc, item) => {
                if (item[1].thumbnail){
                    if(item[1].thumbnail.width >= 2000){
                    let myId = id;
                    acc.push(
                        <div className={Style.contentContainer} key={item[1].pageid} style={{backgroundImage: `url( ${item[1].thumbnail.source})`}}>
                        <div className={Style.contentNavigator}> 
                        <h2 className={Style.contentHeading}> {item[1].title} </h2>
                        <div className={Style.iconContainer}>
                        <div className={Style.iconRound}><FontAwesomeIcon className={Style.icon} icon={faStar} /></div> 
                        <div className={Style.iconRound}><FontAwesomeIcon className={Style.icon} icon={faCompass} /></div>
                        <div onClick={() => {toggle(); setId(item[1].pageid); console.log(thisId)}} className={Style.iconRound}>
                        <FontAwesomeIcon className={Style.icon} icon={faBars} />
                        <Modal
                        isShowing={isShowing}
                        hide={toggle}
                        id={myId} // Passing the id to the modal component.. I think??
                        /></div>
                        <a href="/" className={Style.iconRound}><FontAwesomeIcon className={Style.icon} icon={faUndo} /></a>

                        </div>
                        <div className={Style.linkContainer}>     
                        <a className={Style.aLinkLeft} href={"http://en.wikipedia.org/?curid=" + item[1].pageid}>Read more |</a>
                        <a className={Style.aLink} href="/"> Get directions</a>
                        </div>
                        <div onClick={() => changeSlide(-1)} className={Style.iconRoundLeft}><FontAwesomeIcon className={Style.icon} icon={faArrowLeft} /></div>
                        <div onClick={() => changeSlide(+1)} className={Style.iconRoundRight}><FontAwesomeIcon className={Style.icon} icon={faArrowRight} /></div>
                    </div>
                    
                    </div>
                    )
                }}
                return acc;
           }, [])
        }
    }

    if (!apiData) {
        return (
            <>
                <section className={Style.topSection}>
                    <nav className={Style.topNav}>
                        <div className={Style.topIcons}>
                        </div>
                    </nav>
                    <h2>Aalborg City</h2>
                    <h4>Within {range} km of you is</h4>
                </section>

                <section className={Style.bottomSection}>
                    <input onChange={stateChange} value={range} id="rangeSlider" className={Style.bottomRange} type="range" min="1" max="10"></input>
                    <div className={Style.labelContainer}>
                        <label className={Style.labelLeft}>1 Km</label>
                        <label className={Style.labelRight}>10 Km</label>
                    </div>
                    <button onClick={fetchAll} className={Style.bottomButton} value="Search" type="button"></button>
                </section>
            </>
        )
    }
    else {
       // console.log(apiData);
        //CreateDataArray();
        return (
            <>
 
            {WikiArray(thisId)[active]}
            </>
        )
    }

}

export default Content;