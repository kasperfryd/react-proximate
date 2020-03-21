import React from 'react';
import Style from '../styles/content.module.scss';

import logoSideWhite from '../images/icons/proximate-side-white.png';

// The default start screen
export function StartScreen(props){
    
    // return this if fetch for location was successful
    if (props.area){
    return (
        <>
        <section className={Style.topSection}>
            <nav className={Style.topNav}>
                <img className={Style.mainLogo} alt="white-proxmate-logo" src={logoSideWhite} />
                <div className={Style.topIcons}>
                </div>
            </nav>
            <h2>{props.area.city}</h2>
            <h4>Within {props.range} km of you is</h4>
        </section>

        <form className={Style.bottomSection}>
            <input onChange={props.stateChange} value={props.range} id="rangeSlider" className={Style.bottomRange} type="range" min="1" max="10"></input>
            <div className={Style.labelContainer}>
                <label className={Style.labelLeft}>1 Km</label>
                <label className={Style.labelRight}>10 Km</label>
            </div>
            <button onClick={props.fetchAll} className={Style.bottomButton} value="Search" type="button">Search</button>
        </form>
        </>
    )
}

// Else return this version without city name
else{
    return(
        <>
        <section className={Style.topSection}>
            <nav className={Style.topNav}>
            <img className={Style.mainLogo} alt="white-proxmate-logo" src={logoSideWhite} />
                <div className={Style.topIcons}>
                </div>
            </nav>
            <h4>Within {props.range} km of you is</h4>
        </section>

        <form className={Style.bottomSection}>
            <input onChange={props.stateChange} value={props.range} id="rangeSlider" className={Style.bottomRange} type="range" min="1" max="10"></input>
            <div className={Style.labelContainer}>
                <label className={Style.labelLeft}>1 Km</label>
                <label className={Style.labelRight}>10 Km</label>
            </div>
            <button onClick={props.fetchAll} className={Style.bottomButton} value="Search" type="button">Search</button>
        </form>
        </>
    )
}
}

export default StartScreen;