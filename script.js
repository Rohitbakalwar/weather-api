let cityname = document.querySelector(".city");
let date = document.querySelector(".date");
let weather_status = document.querySelector(".weather-status");
let weather_icon = document.querySelector(".weather-icon");
let temp = document.querySelector(".temp");
let mini = document.querySelector(".mini");
let maxi = document.querySelector(".maxi");
let f_l = document.querySelector(".f-l");
let humi = document.querySelector(".humi");
let win = document.querySelector(".win");
let press = document.querySelector(".press");
let search = document.querySelector(".weather-search");

 const getCountryName = (code)=>{
  return new Intl.DisplayNames([code], { type: 'region' }).of(code)
}

const getDateTime =(dt)=>{
  const currentDate = new Date(dt*1000);
  const options = {
    weekday:"long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US",options)
  // console.log(formatter);
  return formatter.format(currentDate);
}

let city = "pune";

search.addEventListener("submit",(e)=>{
  e.preventDefault();
  let cityName = document.querySelector(".city-name")
  // console.log(cityName.value);
  city = cityName.value;
  getWeatherData();
  cityName.value = "";
})

async function getWeatherData() {
  const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=06c7e366220cb1bc89bca733879ef66e`;
  try {
    const res = await fetch(weatherUrl);
    const data = await res.json();
    // console.log(data);
    const { main, name, weather, wind, sys, dt } = data;
    cityname.innerHTML = `${name},${getCountryName(sys.country)}`;
    date.innerHTML = getDateTime(dt);
    weather_status.innerHTML = weather[0].main;
    weather_icon.innerHTML = `<img src="http://openweathermap.org/img/wn/${weather[0].icon}@4x.png" />`
    temp.innerHTML = `${(main.temp - 273.15).toFixed(2)}&#176`
    mini.innerHTML = `min: ${(main.temp_min - 273.15).toFixed()}&#176`
    maxi.innerHTML = `max: ${(main.temp_max - 273.15).toFixed()}&#176`
    f_l.innerHTML = `${(main.feels_like - 273.15).toFixed()}&#176`
    humi.innerHTML = `${main.humidity}%`
    win.innerHTML = `${wind.speed} m/s`
    press.innerHTML = `${main.pressure} hpa`
  } catch (error) {
    console.log(error);
  }
}

window.addEventListener("load", getWeatherData);
