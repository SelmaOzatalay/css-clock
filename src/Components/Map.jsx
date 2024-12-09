import React, { useEffect, useRef, useState, createContext } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import LocationContext from '../LocationContext';

import 'mapbox-gl/dist/mapbox-gl.css';

const Map = (props) => {
  const mapContainerRef = useRef();
  const mapRef = useRef();
  // const [moveEvent, setMoveEvent] = useState();
  // const [currentLngLat, setCurrentLngLat] = useState({lng: -40.380836, lat: 29.044584})

  

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/selma-oz/clyps3las00ab01r16h7ud1m0",
      // center: [-40.380836, 29.044584],
      zoom: [2]
    });

    mapRef.current.on('click', (e) => {
      console.log(e.lngLat.lng)
      // setCurrentLngLat({lng: e.lngLat.lng, lat: e.lngLat.lat})
      getLocationAndTimezone(e.lngLat.lng, e.lngLat.lat)
      // setMoveEvent(e);
    });

    return () => mapRef.current.remove();
  }, []);



  const getLocationAndTimezone = (lng, lat)=> {
    let locationTimezone = {location: null, timezone: null} 
    axios.get(`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${lng}&latitude=${lat}&access_token=${process.env.REACT_APP_MAPBOX_GEO_API_KEY}`)
    .then(function (response) {
      response.data.features[1].properties.place_formatted ?
      locationTimezone['location'] = response.data.features[1].properties.place_formatted :
      response.data.features.forEach((feat)=>{
        if (feat.properties.feature_type === 'country') {
          locationTimezone['location'] = feat.properties.name_preferred
        }
      })
      axios.get(`https://api.mapbox.com/v4/examples.4ze9z6tv/tilequery/${lng},${lat}.json?access_token=${process.env.REACT_APP_MAPBOX_GEO_API_KEY}`)
      .then(function (response) {
        locationTimezone.timezone = response.data.features[0].properties.TZID;
        // console.log(locationTimezone)
        props.onUpdateLocation(locationTimezone)
      })
      .catch(function (error) {
        console.log(error);
      })
    })
    .catch(function (error) {
      console.log(error);
    })
  }

  return (
    <>
      <div
        id="map"
        ref={mapContainerRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          bottom: 0,
          height: '100%',
          width: '100%'
        }}
      >
      </div>
    </>
  );
};

export default Map;