//Requiring necessary modules
const path = require("path");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");
const fetch = require("node-fetch");

//Setting up path for express (templating engines, public file, hbs)
app.use(express.static(path.join(__dirname, "../public")));
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setting up templating engine
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Responses on browser
app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Omosaku Emmanuel",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Omosaku Emmanuel",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "Help Page",
    title: "help",
    name: "Omosaku Emmanuel",
  });
});
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address!",
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});
app.get("/help/*", (req, res) => {
  res.render("404", {
    message: "Help article not found.",
    name: "Omosaku Emmanuel",
    title: "404",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    message: "Page not found, Check your address.",
    title: "404 Error.",
    name: "Omosaku Emmanuel",
  });
});
//App is running
app.listen(port, () => {
  console.log("Server is currently running on port " + port);
});
