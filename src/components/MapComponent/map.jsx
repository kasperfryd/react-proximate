import React from 'react'
import { Map, withLeaflet, Marker, Popup, TileLayer, Polyline, Tooltip } from 'react-leaflet'
import MeasureControlDefault from 'react-leaflet-measure';

// import leaflet and styles
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './leafletStyles.css';

//Import icons for leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

function MapComponent() {

    // Set all coordinates
    const pos2 = { lat: 51.485, lng: -0.02 }
    const pos1 = { lat: 57.033259, lng: 9.95439 }

    const lat1 = 51.485;
    const lon1 = -0.02;

    const lat2 = 57.033259;
    const lon2 = 9.95439;

    const location1 = "Aalborg"
    const location2 = "London"

    // Set icon options
    let MarkerIcon = L.icon({
        iconUrl: icon,
        shadowUrl: iconShadow,
        iconAnchor: [12, 40],
        shadowSize: [28, 55],
        shadowAnchor: [10, 50]
    });

    // Set up for measureControl
    const MeasureControl = withLeaflet(MeasureControlDefault);

    // Set options for measureControl module from 'react-leaflet-measure'
    const measureOptions = {
        position: 'topright',
        primaryLengthUnit: 'meters',
        secondaryLengthUnit: 'kilometers',
        primaryAreaUnit: 'sqmeters',
        secondaryAreaUnit: 'acres',
        activeColor: '#db4a29',
        completedColor: '#9b2d14'
    };

    L.Marker.prototype.options.icon = MarkerIcon;

    // Distance from coordinates calculation from:
    // https://stackoverflow.com/questions/18883601/function-to-calculate-distance-between-two-coordinates
    function getDistanceFromLatLonInKm(_lat1, _lon1, _lat2, _lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(_lat2 - _lat1);  // deg2rad below
        var dLon = deg2rad(_lon2 - _lon1);
        var a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(deg2rad(_lat1)) * Math.cos(deg2rad(_lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c; // Distance in km
        return d;
    }
    function deg2rad(deg) {
        return deg * (Math.PI / 180)
    }

    // Get distance between points
    let distance = Math.round(getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2))

    // Create map with react-leaflet
    const map = (
        <Map center={pos1} zoom={13}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            />
            <Marker position={pos1}>
                <Tooltip permanent={true}>{location1}</Tooltip>
                <Popup>From {location1} to {location2} there are roughly {distance} km </Popup>
            </Marker>
            <Marker position={pos2}>
                <Tooltip permanent={true}>{location2}</Tooltip>
                <Popup>From {location2} to {location1} there are roughly {distance} km</Popup>
            </Marker>
            <MeasureControl {...measureOptions} />
            <Polyline key={"polyline"} positions={[[lat1, lon1], [lat2, lon2],]} color={'green'} weight={'3'} />
        </Map>
    )

    return (map)
}


export default MapComponent;