import React, { useRef, useState, useEffect } from 'react';
import { render } from '@testing-library/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { faStar } from '@fortawesome/free-solid-svg-icons'
import { faStar } from '@fortawesome/free-regular-svg-icons'
import { faCompass } from '@fortawesome/free-regular-svg-icons'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faUndo } from '@fortawesome/free-solid-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'


import Style from './home.module.scss';

function ShowHome() {

    const [apiData, setApiData] = useState(null)
    const [range, setRange] = useState(10)
    const [cityName, setCityName] = useState(null)
    const [active, setActive] = useState(0);

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

    if (!cityName) {
        navigator.geolocation.getCurrentPosition(success, error);
    }


    const fetchAll = () => {
        fetchApiData();
        fetchGeoData();
    }

    const fetchGeoData = async () => {
        let geoURL = `https://geocode.xyz/${lat},${long}?json=1'`;

        try {
            const georeq = await fetch(geoURL);
            const geores = await georeq.json();
            setCityName(geores);
        } catch (error) {
            console.log(error)
        }
    }

    const fetchApiData = async () => {
        let url = `https://en.wikipedia.org/w/api.php?&format=json&origin=*&action=query&generator=geosearch&prop=coordinates|pageimages&piprop=thumbnail&pithumbsize=3000&ggscoord=${lat}|${long}&ggsradius=${range * 1000}&ggslimit=50`;

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

/*     function wikiArticle(name, id, img){
        this.name = name;
        this.id = id;
        this.img = img;
    } */


    // Creates new wikiArticle once fetch is completed
/*     const CreateDataArray = () => {
        let wikiArr = [];
        let data = apiData.query.pages;
        let dataArr = Object.entries(data); 
        dataArr.map(item => {
            if (item[1].thumbnail){
            wikiArr.push(new wikiArticle(item[1].title, item[1].pageid, item[1].thumbnail));
            }
        });
        console.log(wikiArr);
        console.log(cityName);
     
    } */


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


    const WikiArray = () =>{
        if (apiData && apiData.query && apiData.query.pages){
           return Object.entries(apiData.query.pages).reduce((acc, item) => {
                if (item[1].thumbnail){
                    if(item[1].thumbnail.width >= 2000){
                    acc.push(
                        <div className={Style.contentContainer} key={item[1].pageid} style={{backgroundImage: `url( ${item[1].thumbnail.source})`}}>
                        <div className={Style.contentNavigator}> 
    
                        <h2 className={Style.contentHeading}> {item[1].title} </h2>
                        <div className={Style.iconContainer}>
                        <a className={Style.iconRound}><FontAwesomeIcon className={Style.icon} icon={faStar} /></a>
                        <a className={Style.iconRound}><FontAwesomeIcon className={Style.icon} icon={faCompass} /></a>
                        <a className={Style.iconRound}><FontAwesomeIcon className={Style.icon} icon={faBars} /></a>
                        <a className={Style.iconRound}><FontAwesomeIcon className={Style.icon} icon={faUndo} /></a>

                        </div>
                        <div className={Style.linkContainer}>     
                        <a className={Style.aLinkLeft} href={"http://en.wikipedia.org/?curid=" + item[1].pageid}>Read more |</a>
                        <a className={Style.aLink} href="#"> Get directions</a>
                        </div>
                        <a onClick={() => changeSlide(-1)} className={Style.iconRoundLeft}><FontAwesomeIcon className={Style.icon} icon={faArrowLeft} /></a>
                        <a onClick={() => changeSlide(+1)} className={Style.iconRoundRight}><FontAwesomeIcon className={Style.icon} icon={faArrowRight} /></a>

                        
                    </div>
                    </div>
                    )
                }}
                return acc;
           }, [])
        }
    }
/* 
    const wikiArray = (apiData && apiData.query && apiData.query.pages) ? Object.entries(apiData.query.pages).reduce((acc, item) => {
        
        if(item[1].thumbnail) {
            acc.push(
                <div key={item[1].pageid}>
                    {item[1].title}
                </div>
            )
        }
        return acc
    }, []) : []; */

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
        console.log(apiData);
        //CreateDataArray();
        return (
            <>
            {/* WikiArray.map(wiki => {
                return (
                    <div key={wiki.pageid}>
                        {wiki.title}
                    </div>
                )
            }) */}
            {WikiArray()[active]}
            </>
        )
    }

}

export default ShowHome;