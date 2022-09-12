import React from 'react';
import { GoogleMap, LoadScript, MarkerF} from '@react-google-maps/api';

export const MapContainer = () => {
  
  const mapStyles = {        
    height: "70vh",
    width: "100%"};
  
  const defaultCenter = {
    lat: 51.507514, lng: -0.073505
  }
  
  return (<div className='map'>
     <LoadScript
       googleMapsApiKey='AIzaSyCBH38D9Nsmbq6Gva-Zlms_EtrwVyIUDXY'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={17}
          center={defaultCenter}>
            <MarkerF icon="/iconclipped.png" title = "QACinema is located here" position={{lat:  51.507514,lng: -0.073505}}></MarkerF>
            {/* <InfoWindowF position={{lat:  51.507514,lng: -0.073505}}><h1>Test</h1></InfoWindowF> */}
            </GoogleMap>
     </LoadScript>
     </div>
  )
}