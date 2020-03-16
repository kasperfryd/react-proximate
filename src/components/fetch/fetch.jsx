import React, { useRef, useContext, useState, useEffect } from 'react';
import Start from '../start/startscreen';

const FContext = React.createContext();

// Modal provider. Tager imod children nodes (andre components osv) som props

export function FetchProvider() {
  // Sæt reference til modal og state for context
  const fetchRef = useRef();
  const [context, setContext] = useState();

  // make sure re-render is triggered after initial
  // render so that modalRef exists
  useEffect(() => {
    setContext(fetchRef.current);
  }, []);

 // returner en context.provider med indhold children, og en div, med ref til modalRef
  return (
      <FContext.Provider value={context}></FContext.Provider>
  );
}

export function Fetch() {
    const fetchNode = useContext(FContext);
    const [apiData, setApiData] = useState(null)
    
    const fetchAll = () => {
        fetchApiData();
        fetchGeoData();
    }
     
    let long;
    let lat;

    function getLocation() {
        const success = (pos) => {
            let position = pos.coords;
            lat = position.latitude;
            long = position.longitude;
            console.log("lat is " + lat + "long is " + long);
        }

        const error = (error) => {
            console.log(error);
        }

        navigator.geolocation.getCurrentPosition(success, error);
        return (
            long,
            lat
        )
    }

    getLocation();


    const fetchGeoData = async () => {
    /*       let geoURL = `https://geocode.xyz/${lat},${long}?json=1'`;

        try {
            const georeq = await fetch(geoURL);
            const geores = await georeq.json();
            setCityName(geores);
        } catch (error) {
            console.log(error)
        } */
    }

    const fetchApiData = async () => {
        let url = `https://en.wikipedia.org/w/api.php?&format=json&origin=*&action=query&generator=geosearch&prop=coordinates|pageimages&piprop=thumbnail&pithumbsize=2000&ggscoord=${lat}|${long}&ggsradius=${Start.range * 1000}&ggslimit=50`;

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
}