import { useEffect, useState } from 'react';
import { weatherStore } from '../store/weather';

export default function Header() {
  const [geoInfo, setGeoInfo] = useState({
    lat: 0,
    lon: 0,
  });
  const [weatherToggle, setWeatherToggle] = useState(false);
  const weather = weatherStore();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setGeoInfo({
        lat: position.coords.latitude,
        lon: position.coords.longitude,
      });
    });

    const timer = setInterval(() => {
      setWeatherToggle(!weatherToggle);
    });

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    getWeatherData();
  }, [geoInfo]);

  async function getWeatherData() {
    // await tick();
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${geoInfo.lat}&lon=${geoInfo.lon}&appid=${import.meta.env.VITE_WEATHER_API_KEY}`
    );
    const data = await res.json();

    const _weather = {
      info: data.weather[0],
      main: data.main,
    };
    weather.update(_weather);
  }

  //   console.log(weather.data);

  return (
    <section
      style={{
        height: '140px',
        padding: '16px 0',
      }}
    >
      <div
        style={{
          width: '300px',
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 24px',
          alignItems: 'center',
        }}
      >
        <p>오늘의 날씨는</p>
        {weatherToggle ? (
          <p>{(weather.data.main.temp - 273.15).toFixed()}°C</p>
        ) : (
          <img
            src={`https://openweathermap.org/img/wn/${weather.data.info.icon}@2x.png`}
            alt={weather.data.info.id + ''}
          />
        )}
      </div>
    </section>
  );
}
