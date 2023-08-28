'use client'
import Image, { StaticImageData } from 'next/image'
import cloud from '../public/cloud.svg'
import fog from '../public/fog.svg'
import rain from '../public/rain.svg'
import snow from '../public/snow.svg'
import sun from '../public/sun.svg'
import thunder from '../public/thunder.svg'
import bgCloud from '../public/bgCloud.jpg'
import bgFog from '../public/bgFog.jpg'
import bgRain from '../public/bgRain.jpg'
import bgSnow from '../public/bgSnow.jpg'
import bgSun from '../public/bgSun.jpg'
import bgThunder from '../public/bgThunder.jpg'
import toDay from './utils/toDay'
import toWeather from './utils/toWeather'
import { useEffect, useState } from 'react'


export default function Home() {
  const [day, setDay] = useState<string[]>([]);
  const [weather, setWeather] = useState<string[]>([]);
  const [temp, setTemp] = useState([]);
  const [loading, setLoading] = useState(true);
  const background: { [key: string]: StaticImageData} = {"sun": bgSun, "cloud": bgCloud, "rain": bgRain, "fog": bgFog, "snow": bgSnow, "thunder": bgThunder}
  const icon: {[key: string]: StaticImageData} = {"sun": sun, "cloud": cloud, "rain": rain, "fog": fog, "snow": snow, "thunder": thunder}


  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async function (position) {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        try {
          const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weathercode,temperature_2m_max&timezone=auto`
          );
          const data = await response.json();
          const date: string[] = toDay(data.daily.time)
          const weather: string[] = toWeather(data.daily.weathercode)
          const temp = data.daily.temperature_2m_max
          console.log(weather)
          setDay(date);
          setWeather(weather);
          setTemp(temp);
          setLoading(false);
        } catch (error) {
          console.log(error);
        }
        
      }
    )
  }, [])
  
  return (
      <main>
        {loading ? <div className="h-screen w-screen z-50 flex justify-center items-center text-"><h1 className='text-9xl'>Loading...</h1></div> : null}
        <div className='h-screen w-screen flex justify-between items-center'>
          <Image src={background[weather[0]]} alt='cloud' fill sizes='100vw' quality={100} style={{objectFit: 'cover', zIndex: "-1"}}/>
          <div className='h-screen w-1/2 py-[6.6vh]'>
            <div className=' w-[23.83vw] h-full bg-black/25 rounded-tr-full rounded-br-full flex justify-center items-center'>
              <h1 className='text-white text-[11.64vw] tracking-tighter'>{Math.round(temp[0])}°</h1>
            </div>
          </div>
          <div className='gap-[5vh] noscroll overflow-auto h-full bg-black/25 w-[29.7vw] flex flex-col items-center px-[6vw]'>
            {day.map((d) => (
              <div key={d} className='flex flex-col'>
                <h1 className='text-white text-[5.9vw] text-center'>{d}</h1>
                <Image src={icon[weather[day.indexOf(d)]]} alt='icon'/>
              </div>
            ))}
          </div>
        </div>

      </main>
  )
}
