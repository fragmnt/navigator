import React from 'react';
import ReactDOM from 'react-dom';
import publicIP from 'public-ip';
import geoPoint from 'geopoint';

import './index.css';

const TrafficMap = () => {

    var isLoaded = false;
    var err = null;
    var trafficData = [];
    let ttkey = process.env.TOMTOM_API_TOKEN;

    let getBoundingBox = (latitude, longitude) => {
        const bboxValues = new geoPoint(latitude, longitude).boundingCoordinates(10, true);
        return bboxValues;
    };

    let retrieveRegionReport = () => {
        publicIP.v4()
        .then(ip => fetch(`https://ipapi.co/${ip}/json`))
        .then(res => res.json())
        .then(result => this.getBoundingBox(result.latitude, result.longitude))
        .then(
            values =>
            fetch(`https://api.tomtom.com/traffic/services/4/incidentDetails/s3/${values[0]._degLat},${values[0]._degLon},${values[1]._degLat},${values[1]._degLon}/10/-1/json?key=${ttkey}&projection=EPSG4326`)
        ) 
        .then(res => res.json())
        .then(
            payload => {
                    isLoaded = true;
                    trafficData = payload["tm"]["poi"];
            },
            error => {
                isLoaded = true;
                err = error;
            }
        )
    };

    return (
        <>

        </>
    )
}

export default TrafficMap;