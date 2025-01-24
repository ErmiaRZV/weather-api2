const main = document.querySelector("main");
const search_input = document.querySelector("#search");
const search_button = document.querySelector("#search-button");
const city_name = document.querySelector("#name");
const city_temp = document.querySelector("#temp");
const city_time = document.querySelector("#time");
const logo = document.querySelector("#logo");
const humidity = document.querySelector("#humidity");
const cloud = document.querySelector("#cloud");
const wind = document.querySelector("#wind");
const weather_description = document.querySelector("#weather-description");

const options = {
  method: "GET",
};
fetch(
  "https://api.openweathermap.org/data/2.5/weather?q=tehran&appid=1b3309cd03d88384928def87f410c0cf&units=metric",
  options
)
  .then((res) => {
    if (res.ok) return res.json();
    Promise.reject(err);
  })
  .then((data) => {
    console.log(data);

    city_time.innerHTML = data.sys.country;
    city_name.innerHTML = "tehran";
    city_temp.innerHTML =
      data.main.temp +
      `<sub class="text-white text-3xl translate-y-[-40px]">o</sub>`;
    
    if (
      data.weather[0].main =="Snow"
    ) {
      logo.src = "images/snow-b.svg";
      main.children[0].src = "images/snow.jpg";
    } else if (
      data.weather[0].main =="Clouds"
    ) {
      logo.src = "images/cloud-b.svg";
      main.children[0].src = "images/clouds.jpg";
    } else if (
      data.weather[0].main =="Clear"
    ) {
      logo.src = "images/sun-b.svg";
      main.children[0].src = "images/clear.jpg";
    } else if (
       data.weather[0].main =="Rain"
    ) {
      logo.src = "images/rain-b.svg";
      main.children[0].src = "images/rain.jpg";
    } else {
      logo.src = data.current.weather_icons[0];
      main.children[0].src = "images/rain.jpg";
    }

    wind.innerHTML = data.wind.speed + "km/h";
    cloud.innerHTML = data.clouds.all + "%";
    humidity.innerHTML = data.main.humidity + "%";
    weather_description.innerHTML = data.weather[0].description;
  })
  .catch((err) => console.log(err));

search_button.addEventListener("click", () => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${search_input.value}&appid=1b3309cd03d88384928def87f410c0cf&units=metric`;
  const options = {
    method: "GET",
  };
  
  fetch(url, options)
    .then((res) => {
      if (res.ok) return res.json();
      Promise.reject(err);
    })
    .then((data) => {
        city_time.innerHTML = data.sys.country;
        city_name.innerHTML = data.name;
        city_temp.innerHTML =
          data.main.temp +
          `<sub class="text-white text-3xl translate-y-[-40px]">o</sub>`;

          if (
            data.weather[0].main =="Snow"
          ) {
            logo.src = "images/snow-b.svg";
            main.children[0].src = "images/snow.jpg";
          } else if (
            data.weather[0].main =="Clouds"
          ) {
            logo.src = "images/cloud-b.svg";
            main.children[0].src = "images/clouds.jpg";
          } else if (
            data.weather[0].main =="Clear"
          ) {
            logo.src = "images/sun-b.svg";
            main.children[0].src = "images/clear.jpg";
          } else if (
             data.weather[0].main =="Rain"
          ) {
            logo.src = "images/rain-b.svg";
            main.children[0].src = "images/rain.jpg";
          } else {
            logo.src = data.current.weather_icons[0];
            main.children[0].src = "images/rain.jpg";
          }
      wind.innerHTML = data.wind.speed + "km/h";
    cloud.innerHTML = data.clouds.all + "%";
    humidity.innerHTML = data.main.humidity + "%";
    weather_description.innerHTML = data.weather[0].description;
      search_input.value = "";
      search_input.focus();
    })
    .catch((err) => console.log(err));
});

search_input.addEventListener("keyup", (e) => {
  if (e.keycode || e.which == 13) {
    search_button.click();
  }
});
