import React from "react";

import Navbar from "components/Navbars/IndexNavbar";
import Footer from "components/Footers/Footer.js";
import MapExample from "components/Maps/Map.js";

import OpenWeatherMap from 'openweathermap-ts';

import { vars } from '../vars'

const weatherURL = 'http://localhost:8080/weather' || 'https://test.loca.lt/weather'


export default function Landing() {

  const [weather, setWeather] = React.useState([]);
  const [temp, setTemp] = React.useState([]); 
  const [min, setmin] = React.useState([]); 
  const [max, setmax] = React.useState([]); 
  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(showPosition);
    gettemp(); 
  }, []);
  
  function gettemp(){
    const openWeather = new OpenWeatherMap({
      apiKey: 'cef2ac7ef2445f3bbfcf45109582bbce'
    });
    openWeather
    .getCurrentWeatherByCityName({
      cityName: 'Richardson'
    })
    .then((weather) =>{
      console.log(weather);
      setTemp(weather.main.temp);
      setmax(weather.main.temp_max);
      setmin(weather.main.temp_min);
    }
    );
  }

  function showPosition(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log("here");
    fetch(`${weatherURL}?lat=${latitude}&long=${longitude}`)
      .then(response => response.json())
      .then(data => setWeather(data))
      .then(console.log(weather))
  }


  return (
    <>
      <Navbar transparent />
      <main>
        <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage: 'url(img/weather.jpg)',
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-75 bg-black"
            ></span>
          </div>
          <div className="container relative mx-auto">
            <div className="items-center flex flex-wrap">
              <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                <div className="pr-12">

                  <h1 className="text-white font-semibold text-5xl">
                    Weather Near You
                  </h1>
                  <p className="mt-4 text-lg text-blueGray-200">
                    <i>{vars.appTitle}</i> provides <b>live</b> updates to your area about weather changes that could become
                    a liability to your safety and property
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden h-16"
            style={{ transform: "translateZ(0)" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-blueGray-200 fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </div>

        <section className="pb-20 bg-blueGray-200 -mt-24">
          <div className="container mx-auto px-4">
            <div className="flex justify-center">

              <div className="px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-12 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-lightBlue-400">
                      <i className="fas fa-retweet"></i>
                    </div>
                    <h6 className="text-xl font-semibold">{temp}°F </h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      High for today: {max}°F <br/>
                      Low for today: {min}°F
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6 w-full md:w-4/12 px-4 text-center">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg">
                  <div className="px-4 py-5 flex-auto">
                    <div className="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-emerald-400">
                      <i className="fas fa-fingerprint"></i>
                    </div>
                    <h6 className="text-xl font-semibold uppercase"> Announcements </h6>
                    <p className="mt-2 mb-4 text-blueGray-500">
                      Check routinely for updates and how you can preserve your property and belongings
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center mt-32">
              <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                <div className="flex justify-around">
                  <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                    <i className="fas fa-user-friends text-xl"></i>
                  </div>
                </div>


                <div className="container mx-auto items-center grid grid-rows1 h-600-px" style={{ overflow: 'auto' }}>
                  {weather
                    .sort((a, b) => a.timestamp < b.timestamp ? 1 : -1)
                    .map(notif => (
                      <div className="text-white my-4 px-6 py-4 rounded outline-none focus:outline-none mr-1 mb-1 bg-blueGray-400 active:bg-blueGray-500 text-sm shadow hover:shadow-lg ease-linear transition-all duration-150">
                        <div className="flex justify-between">
                          <h2 className="font-bold"> {notif.notificationID} </h2>
                          <p style={{ textAlign: 'left' }}> {notif.temperature}°</p>
                        </div>
                        <hr />
                        <p> {notif.message} </p>
                        <p style={{ fontSize: "0.7rem", textAlign: 'right' }}> For {new Date(notif.timestamp).toUTCString()} </p>
                      </div>
                    ))}
                </div>
              </div>

              <div className="w-full md:w-8/12 px-4 mr-auto ml-auto">
                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-10 shadow-lg rounded-lg bg-blueGray-700">
                  <MapExample />
                  <blockquote className="relative p-5 mb-2">

                    <h4 className="text-xl font-bold text-white">
                      Top Notch Services
                    </h4>
                    <p className="text-s font-light mt-2 text-white">
                      The Arctic Ocean freezes every winter and much of the
                      sea-ice then thaws every summer, and that process will
                      continue whatever happens.
                    </p>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
