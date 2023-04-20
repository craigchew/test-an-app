const express = require("express");
const app = express();
const exd = require("hbs");
const path = require("path");
const port = 3000;
const enquiry = require("../src/public/scripts/scripts1");
const _publicFolder = path.join(__dirname, "/public");
const _partialFolder = path.join(__dirname, "/template/partials");
const _viewFolder = path.join(__dirname, "/template/views");

app.set("view engine", "hbs");
app.set("views", _viewFolder);
exd.registerPartials(_partialFolder);
app.use(express.static(_publicFolder));

app.get("", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.render("home", {});
});

app.get("/home/*", (req, res) => {
    res.render("error");
  });

app.get("/weather", (req, res) => {
  if (req.query.country) {
    return enquiry
      .getCountryLatAndLon(req.query.country)
      .then((data) => {
        return enquiry.getTemperatureLatAndLon(data.latitude, data.longitude);
      })
      .then((data) => res.send(data))
      .catch((err) => {
        res.status(404).send(err);
      });
  }
  res.render("weather", {});
});

app.get("/weather/*", (req, res) => {
    res.render("error",{
        pageName: req.path.slice(req.path.lastIndexOf('/')+1 ,req.path.length )
    });
  });

app.get("/help", (req, res) => {
  res.render("help", {});
});

app.get("/help/*", (req, res) => {
  res.render("error",{
    pageName: req.path.slice(req.path.lastIndexOf('/')+1 ,req.path.length )
});
});

app.get("*", (req, res) => {
    res.render("error",{
        pageName: req.path.slice(req.path.lastIndexOf('/')+1 ,req.path.length )
    });
});

app.listen(port, () => {
  console.log("running");
});
