import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  IoMdSunny,
  IoMdRainy,
  IoMdSnow,
  IoMdCloud,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsThermometer,
  BsWind,
  BsWater,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import { ImSpinner10 } from "react-icons/im";

// 434cf818aa846c3e0faf4614249aa15b

const APIkey = "434cf818aa846c3e0faf4614249aa15b";

const Weather = () => {
  const [data, setData] = useState(null);
  const [location, setLocation] = useState("Himachal Pradesh");
  const [inputValue, setInputValue] = useState("");
  const [animate, setAnimate] = useState(false);
  // const [loading, setLoading] = useState(false);
  //   console.log(inputValue);

  const handleInput = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    console.log(inputValue);

    if (inputValue !== "") {
      setLocation(inputValue);
    }

    //select input
    const input = document.querySelector("input");

    // if input value is empty
    if (input.value === "") {
      //set animate true
      setAnimate(true);
      //after 500ms set animate to false

      setTimeout(() => {
        setAnimate(false);
      }, 500);
    }
    // clear input
    input.value = "";

    //prevent default
    e.preventDefault();
  };

  const getData = async () => {
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${APIkey}`
    );
    // console.log(data);

    setData(data);
  };

  useEffect(() => {
    getData();
  }, [location]);

  if (!data) {
    return (
      <div>
        <div>
          <ImSpinner10 className="text-4xl animate-spin" />
        </div>
      </div>
    );
  }

  let icon;
  //   console.log(data.weather[0].main);

  switch (data.weather[0].main) {
    case "Clouds":
      icon = <IoMdCloud />;
      break;

    case "Mist":
      icon = <BsCloudHaze2Fill />;
      break;

    case "Haze":
      icon = <BsCloudHaze2Fill />;
      break;

    case "Rain":
      icon = <IoMdRainy />;
      break;

    case "Clear":
      icon = <IoMdSunny />;
      break;

    case "Drizzle":
      icon = <BsCloudDrizzleFill />;
      break;

    case "Snow":
      icon = <IoMdSnow />;
      break;

    case "Thunderstorm":
      icon = <IoMdThunderstorm />;
      break;
  }

  const date = new Date();

  //   useEffect(() => {
  //     const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIkey}`;

  //     axios.get(url).then((res) => {
  //       setData(res.data);
  //     });
  //   }, [location]);

  //   console.log(data);

  return (
    <div
      className="w-full h-screen bg-gradient-to-r from-indigo-500 to-purple-500
    flex flex-col items-center justify-center px-4 lg:px-0"
    >
      {/* form */}
      <form
        className={`${
          animate ? "animate-shake" : "animate-none"
        } h-16 bg-black/30 w-full max-w-[455px]
        rounded-full 
        backdrop-blur-[32px]
        mb-8`}
      >
        <div
          className="h-full relative flex items-center 
          justify-between p-2"
        >
          <input
            onChange={handleInput}
            className="flex-1 bg-transparent 
            outline-none
            placeholder:text-white text-white
            text-[15px]
            font-light
            pl-6
            "
            type="text"
            placeholder="Search by city or country"
          />
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-[#1ab8ed]  hover:bg-[#15abdd]
            h-full 
            w-20 
            rounded-full
           flex justify-center
           items-center
           transition"
          >
            <IoMdSearch className="text-2xl text-white" />
          </button>
        </div>
      </form>
      {/* card */}
      <div
        className="w-full max-w-[455px] bg-black/20 min-h-[585px] text-white
      back-drop-blur-[32px] rounded-[32px] py-12 px-6"
      >
        <div>
          {/* cardtop */}
          <div className="flex items-center gap-x-5 ">
            {/* icon */}
            <div className="text-[87px]">{icon}</div>
            <div>
              {/* counrty name */}
              <div className="text-2xl font-semibold">
                {data.name}, {data.sys.country}
              </div>
              {/* date */}
              <div>
                {date.getUTCDate() + 1}/{date.getUTCMonth() + 1}/
                {date.getUTCFullYear()}
              </div>
            </div>
          </div>

          {/* card body */}
          <div className="my-20 text-[144px]">
            {/* temp */}
            <div
              className="leading-none 
            font-light 
            flex justify-center
            items-center"
            >
              <div>{parseInt(data.main.temp)}</div>
              <div className="text-4xl">
                <TbTemperatureCelsius />
              </div>
            </div>
            <div className="text-2xl capitalize text-center">
              {data.weather[0].description}
            </div>
          </div>

          {/* card bottom */}
          <div className="max-w-[378px] mx-auto flex flex-col gap-y-6">
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2 ">
                <div>
                  <BsEye />
                </div>
                Visibility <span>{data.visibility / 1000}</span> km
              </div>
              <div className="flex items-center gap-x-2 ">
                <div>
                  <BsThermometer />
                </div>
                Feels Like{" "}
                <div className="flex items-center">
                  {parseInt(data.main.feels_like)}
                  <TbTemperatureCelsius />
                </div>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="flex items-center gap-x-2 ">
                <div>
                  <BsWater />
                </div>
                Humidity <span>{data.main.humidity} %</span>
              </div>
              <div className="flex items-center gap-x-2 ">
                <div>
                  <BsWind />
                </div>
                <div>
                  Wind{" "}
                  <span className="ml-2">
                    {" "}
                    {parseInt(data.wind.speed)} m/s{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
