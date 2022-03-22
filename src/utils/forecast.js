const fetch = require("node-fetch");

const forecast = (long, lat, callback) => {
  const url =
    "http://api.openweathermap.org/data/2.5/weather?lat=" +
    encodeURI(lat) +
    "&lon=" +
    encodeURI(long) +
    "&appid=f6994fb0de5f0a3d4201c8a9a23a2f5f&units=metric";

  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      const data =
        "Mostly " +
        res.weather[0].description +
        ", It is currently " +
        res.main.temp +
        " degrees out.\n" +
        "Maintaining a humidity of " +
        res.main.humidity +
        "g/m^3\n" +
        "Wind speed: " +
        res.wind.speed +
        "km/h";
      callback(undefined, data);
    })
    .catch((err) => {
      if (err) {
        callback(
          "Unable to connect to API, check internet connection",
          undefined
        );
      } else if (err.code === "400") {
        callback("Wrong co-ordinates, try a different one", undefined);
      }
    });
};

module.exports = forecast;
