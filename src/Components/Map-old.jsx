import {useRef} from 'react'
import ReactMapboxGl from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

export default function Map() {
	const map = useRef(null)

	const Map = ReactMapboxGl({
		accessToken: "pk.eyJ1Ijoic2VsbWEtb3oiLCJhIjoiY2x5b3I2NzJoMGgxajJqc2Y5N29jcnJ3ZyJ9.PWrJ8qd4daCqm98_Olb57A",
		// minZoom: 0,
		// maxZoom: 6,
		container: map.current,
		// interactiveLayerIds: 'map'
	});

	
	return(
		<div className='map-wrapper' ref={map}>
			<Map 
			 	id="map"
				style="mapbox://styles/selma-oz/clyps3las00ab01r16h7ud1m0" 
				center={[-40.380836, 29.044584]}
				zoom={[3.5]}
				onClick={(e)=>console.log(e)}
			/>
		</div>
	)
}