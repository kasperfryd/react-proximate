import React, {useState, useEffect} from 'react';

function Fetch(){

    const [apiData, setApiData] = useState(null)
    const [range, setRange] = useState(1)
    const [cityName, setCityName] = useState(null)
    console.log(apiData)
    console.log(cityName)

    const stateChange = (event) =>{
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
   
    if (!cityName){
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
        let url =`https://en.wikipedia.org/w/api.php?&format=json&origin=*&action=query&generator=geosearch&prop=coordinates|pageimages&piprop=thumbnail&pithumbsize=400&ggscoord=${lat}|${long}&ggsradius=${range*1000}&ggslimit=50`;
                
                try {
           
                    const req = await fetch(url);
                    const res = await req.json();
                    setApiData(res);
                    }

                catch (error) {
                    console.log(error)
                    }
                } 
}

export default Fetch();