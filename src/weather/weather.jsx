import React, { useState } from "react";
import "./weather.scss";
import WeatherImage from "./imageList";

const Image = ({ imageKey, className, clickFunction }) => {
  const image = WeatherImage.find((img) => img.key === imageKey);

  if (!image) {
    return null;
  }

  return (
    <img
      src={image.src}
      alt={image.alt}
      className={className}
      onClick={clickFunction}
    />
  );
};

const Location = ({ location }) => {
  return <h1 className="weather_container_location">{location}</h1>;
};
const Description = ({ time, description }) => {
  return (
    <h2 className="weather_container_description">
      {time} {description}
    </h2>
  );
};
const CurrentWeather = ({ temperature }) => {
  const Temperature = () => {
    const Celsius = () => {
      return (
        <p className="weather_container_currentWeather_temperature_celsius">
          °C
        </p>
      );
    };
    const Number = ({ temperature }) => {
      return (
        <p className="weather_container_currentWeather_temperature_number">
          {temperature}
        </p>
      );
    };
    return (
      <div className="weather_container_currentWeather_temperature">
        <Number temperature={temperature} />
        <Celsius />
      </div>
    );
  };
  return (
    <div className="weather_container_currentWeather">
      <Temperature />
      <Image
        imageKey="weather_sunny"
        className="weather_container_currentWeather_img"
      />
    </div>
  );
};

const Airflow = ({ windspeed }) => {
  return (
    <div className="weather_container_airflow">
      <Image imageKey="airflow" className="weather_container_airflow_icon" />

      <p>{windspeed}m/h</p>
    </div>
  );
};

const Rain = ({ humid }) => {
  return (
    <div className="weather_container_rain">
      <Image
        imageKey="rainPercentage"
        className="weather_container_rain_icon"
      />
      <p>{humid * 100}%</p>
    </div>
  );
};

const Reload = ({ clickFunction }) => {
  return (
    <Image
      imageKey="reload"
      className="weather_container_reload"
      clickFunction={clickFunction}
    />
  );
};

const Weather = () => {
  const handleClick = () => {
    console.log("work");
    // fetch(
    //   "https://opendata.cwb.gov.tw/api/v1/rest/datastore/O-A0003-001?Authorization=CWA-FEEB8AC2-3E88-4DAB-A924-84830BD7297E&locationName=臺北"
    // )
    //   .then((response) => response.jason)
    //   .then((data) => {
    //     console.log("data", data);
    //   });
  };

  const [currentWeather, setCurrentWeather] = useState({
    observationTime: "2019-10-02 22:10:00",
    locationName: "臺北市",
    description: "多雲時晴",
    temperature: 27.5,
    windSpeed: 0.3,
    humid: 0.88,
  });

  return (
    <div className="weather">
      <div className="weather_container">
        <Location location={currentWeather.locationName} />
        <Description
          time={new Intl.DateTimeFormat("zh-TW", {
            hour: "numeric",
            minute: "numeric",
          }).format(new Date(currentWeather.observationTime))}
          description={currentWeather.description}
        />
        <CurrentWeather temperature={Math.round(currentWeather.temperature)} />
        <Airflow windspeed={currentWeather.windSpeed} />
        <Rain humid={currentWeather.humid} />
        <Reload clickFunction={handleClick} />
      </div>
    </div>
  );
};

export default Weather;

// CWA-FEEB8AC2-3E88-4DAB-A924-84830BD7297E
