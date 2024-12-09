import { useState, useEffect, useContext } from 'react';
import LocationContext from '../LocationContext';

export default function Clock() {
	const location = useContext(LocationContext);

  	const [currentTime, setCurrentTime] = useState({
		seconds: new Date().getSeconds(),
		minutes: new Date().getMinutes(),
		hours: new Date().getHours(),
	})

	const [transitionChange, setTransitionChange] = useState(false)

	useEffect(()=>{
		let timer = setInterval(()=>{
			setCurrentTime({
				seconds: parseInt(new Date().toLocaleTimeString('en-GB',{timeZone:location.timezone, second: '2-digit'})),
				minutes: parseInt(new Date().toLocaleTimeString('en-GB',{timeZone:location.timezone, minute: '2-digit'})),
				hours: parseInt(new Date().toLocaleTimeString('en-GB',{timeZone:location.timezone, hour: "2-digit", hour12: false}))
			})
		},1000)

		return () => {
			clearInterval(timer)
		}
	})

	useEffect(()=>{
		setTransitionChange(true)
		const animTimeout = setTimeout(()=>{
			setTransitionChange(false)
		},600)
		return ()=>clearTimeout(animTimeout)
	},[location])

	return (
		<div className='clock-container' >
			<div className='transition-wrapper' style={{opacity:  transitionChange ? '0':'1'}}>
			<div className='time'>
				<span>{currentTime.hours.toString().length === 1 ? '0'+currentTime.hours : currentTime.hours}</span>
				<span>{currentTime.minutes.toString().length === 1 ? '0'+currentTime.minutes : currentTime.minutes}</span>
				<span>{currentTime.seconds.toString().length === 1 ? '0'+currentTime.seconds : currentTime.seconds}</span>
			</div>
			<div className='clock-wrapper'>
				<div className='clock'>
					<div className='clock-border'>
						<svg className='mask' viewBox='0 0 600 600'>
							<defs>
								<linearGradient id="clock" data-name="Dégradé sans nom 50" x1="4.46" y1="3.44" x2="596.3" y2="597.32" gradientUnits="userSpaceOnUse">
								<stop offset="0" stopColor="#f0bb00"/>
								<stop offset=".2" stopColor="#ad9028"/>
								<stop offset=".44" stopColor="#edd78c"/>
								<stop offset=".7" stopColor="#eab601"/>
								<stop offset="1" stopColor="#6e5501"/>
								</linearGradient>
							</defs>
							<g id="Calque_1-2" data-name="Calque 1" fill="url('#clock')">
								<path className="cls-1" d="M300,0C134.31,0,0,134.31,0,300s134.31,300,300,300,300-134.31,300-300S465.69,0,300,0Zm0,590c-160.16,0-290-129.84-290-290S139.84,10,300,10s290,129.84,290,290-129.84,290-290,290Z"/>
							</g>
						</svg>
					</div>
					<div className='clock-background'>
						<div className='clockwises'>
							<div className='clockwise hours-clockwise' style={{
								transform: `rotate(${(360 / 720 )*(currentTime.hours*60 + currentTime.minutes) }deg)`,
							}}></div>
							<div className='clockwise minutes-clockwise' 
							style={{
								transform: `rotate(${(360 / 60 )*currentTime.minutes }deg)`,
								transition: currentTime.minutes === 0 ? 'none' : 'transform 200ms ease'
							}}
							></div>
							<div className='clockwise seconds-clockwise' 
								style={{
								transform: `rotate(${(360 / 60 )*currentTime.seconds }deg)`,
								transition: currentTime.seconds === 0 ? 'none' : 'transform 100ms linear'
								}}
							>
							</div>
							<div className='clock-center'></div>
						</div>
						<div className='clock-numbers'>
							{Array(12).fill().map((number, idx)=>{
								return <div key={'number'+idx} className='clock-number'><span>{idx.toString()}</span></div>
							})}
						</div>
						<div className='clock-indicators'>
							{Array(60).fill().map((number, idx)=>{
								return <div key={'indicator'+idx} className='indicator'><span></span></div>
							})}
						</div>
					</div>
				</div>
			</div>
			<h2>{location.location}<span>{location.timezone}</span></h2>
			</div>
		</div>
	)
}