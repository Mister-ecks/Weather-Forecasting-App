const fetch = require("node-fetch");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURI(address) +
    ".json?access_token=pk.eyJ1IjoiZW1tYXNha3UiLCJhIjoiY2wwZ2lybGZkMTNlZjNjbXpvdjFsZzhpaCJ9.-zTChPnXxWJQQaceBQ1dkA";

  fetch(url)
    .then((res) => res.json())
    .then((res) => {
      const data = {
        latitude: res.features[0].center[1],
        longitude: res.features[0].center[0],
        location: res.features[0].place_name,
      };
      callback(undefined, data);
    })
    .catch((err) => {
      if (err) {
        callback(
          "Unable to connect, Check your internet connection",
          undefined
        );
      } else if (err.features.length === 0) {
        callback("Location not found, Try another input", undefined);
      }
    });
};

module.exports = geocode;
