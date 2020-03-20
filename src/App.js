import React, { useState } from "react";
import './App.css';

import WikiArray from './components/wikiarray/wikiarray';
import StartScreen from './components/start/startscreen';

function App() {

  let long = null;
  let lat = null;

  const [range, setRange] = useState(10)
  const [apiData, setApiData] = useState(null)
  const [area, setArea] = useState(null);

  const [myLat, setLat] = useState(null);
  const [myLon, setLon] = useState(null);


  const stateChange = (event) => {
    setRange(event.target.value);
    console.log(range);
  }

  const fetchAll = () => {
    fetchApiData();
  }

  const getLocation = () => {
    const success = (pos) => {
      let position = pos.coords;
      lat = position.latitude;
      long = position.longitude;
      console.log("lat is " + lat + "long is " + long);
      let _Lat = lat;
      let _Lon = long;
      setLat(_Lat);
      setLon(_Lon)
      fetchGeoData();
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
    // http://nominatim.org/release-docs/latest/api/Overview/
    let geoURL = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${long}&format=json`;

    try {
      const georeq = await fetch(geoURL);
      const geores = await georeq.json();
      let areaData = {city: geores.address.city, suburb: geores.address.suburb, road: geores.address.road}
      await setArea(areaData);
      console.log(geores);
    } catch (error) {
      console.log(error)
    }
  }

  const fetchApiData = async () => {
    let url = `https://en.wikipedia.org/w/api.php?&format=json&origin=*&action=query&generator=geosearch&prop=coordinates|pageimages&piprop=thumbnail&pithumbsize=2000&ggscoord=${myLat}|${myLon}&ggsradius=${range * 1000}&ggslimit=50`;

    try {
      const req = await fetch(url);
      const res = await req.json();
      setApiData(res);
    }

    catch (error) {
      console.log(error)
    }
  }


  if (myLat === null || myLat === undefined || myLat === "") {
    getLocation();
  }

  if (apiData === null || apiData === undefined) {
    return (
      <StartScreen area={area} stateChange={stateChange} range={range} fetchAll={fetchAll} />
    )
  }
  else {
    return (
      <WikiArray apiData={apiData} area={area} myLon={myLon} myLat={myLat} />
    )
  }
}

export default App;
