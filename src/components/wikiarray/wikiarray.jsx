import React, {useState} from 'react';
import {ModalProvider, Modal} from '../modal/modal';
import Style from '../content/content.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar, faCompass } from '@fortawesome/free-regular-svg-icons'
import { faBars, faUndo, faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

function WikiArray(props) {
    let wikiArr = [];

    const [active, setActive] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    
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
                                    <div className={Style.iconRound}><FontAwesomeIcon className={Style.icon} icon={faCompass} /></div>
                                    <div onClick={() => setIsModalOpen(true)} className={Style.iconRound}>
                                    <FontAwesomeIcon className={Style.icon} icon={faBars} />
                                    </div>
                                        {isModalOpen && ( <Modal onClose={() => setIsModalOpen(false)}>
                                        {item[1].pageid}
                                        </Modal>
                                        )}   
                                    <a href="/" className={Style.iconRound}><FontAwesomeIcon className={Style.icon} icon={faUndo} /></a>

                                </div>
                                <div className={Style.linkContainer}>
                                    <a key={item[1].pageid+1} className={Style.aLinkLeft} href={"http://en.wikipedia.org/?curid=" + item[1].pageid}>Read more |</a>
                                    <a key={item[1].pageid+2}className={Style.aLink} href="/"> Get directions</a>
                                </div>
                                <div onClick={() => ChangeSlide(-1)} className={Style.iconRoundLeft}><FontAwesomeIcon className={Style.icon} icon={faArrowLeft} /></div>
                                <div onClick={() => ChangeSlide(+1)} className={Style.iconRoundRight}><FontAwesomeIcon className={Style.icon} icon={faArrowRight} /></div>
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