import { useState } from 'react';
import Clock from './Components/Clock';
import './App.scss';
import Map from './Components/Map'
import LocationContext from './LocationContext';
import worldIcon from './img/globe.svg'
import infoIcon from './img/info.svg'

function App() {

  const [location, setLocation] = useState({location:'Paris', timezone: 'Europe/Paris'})

  return (
    <div className="App">
      <header className='main-header'>
        <h1><img src={worldIcon}/>The world clock</h1>
        <p></p>
      </header>
      <Map onUpdateLocation={(loc)=>setLocation(loc)}/>
      <LocationContext.Provider value={location}>
        <Clock/>
      </LocationContext.Provider>
      <div className="info">
        <h3><img src={infoIcon}/></h3>
        <p>Click on the map to know the time in the selected country</p>
      </div>
    </div>
  );
}

export default App;
