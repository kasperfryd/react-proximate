import React from 'react';
import Style from '../styles/content.module.scss';

export function StartScreen(props){
    
    if (props.area){
    return (
        <>
        <section className={Style.topSection}>
            <nav className={Style.topNav}>
                <div className={Style.topIcons}>
                </div>
            </nav>
            <h2>{props.area.city} City</h2>
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
else{
    return(
        <>
        <section className={Style.topSection}>
            <nav className={Style.topNav}>
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