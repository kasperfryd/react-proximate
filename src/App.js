import React, { useState } from "react";
import './App.css';

import WikiArray from './components/wikiarray/wikiarray';
import StartScreen from './components/start/startscreen'


function App(){

  let long;
  let lat;
  
  const [apiData, setApiData] = useState(null)
  const [range, setRange] = useState(10)

  const stateChange = (event) => {
    setRange(event.target.value);
    console.log(range);
  }
  
  const fetchAll = () => {
    fetchApiData();
    fetchGeoData();
  }
   
  const getLocation = () => {
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
    let url = `https://en.wikipedia.org/w/api.php?&format=json&origin=*&action=query&generator=geosearch&prop=coordinates|pageimages&piprop=thumbnail&pithumbsize=2000&ggscoord=${lat}|${long}&ggsradius=${range * 1000}&ggslimit=50`;
    
    try {
      const req = await fetch(url);
      const res = await req.json();
      setApiData(res);
    }
    
    catch (error) {
      console.log(error)
    }
  }

  getLocation();

  if(apiData === null || apiData === undefined) {
    return (
            <StartScreen stateChange={stateChange} range={range} fetchAll={fetchAll}/>
    )
  }
  else {
    return (
            <WikiArray apiData={apiData}/>
        )
    }
  }

export default App;
