// index.js
// where your node app starts
require("dotenv").config();
const apiTest = require("./routes/api-Route");
const morgan = require("morgan");
// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));
app.use(morgan("dev"));
// app.use("/api", apiTest);

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

app.get("/api/:date", (req, res) => {
  try {
    let dateFromReq = req.params.date;

    const parsedDateToUnix = Date.parse(dateFromReq);
    console.log("Date.parse(dateFromReq)");
    console.log(parsedDateToUnix);

    if (!parsedDateToUnix) {
      console.log("parsedDateToUnix es falso");
      let dateMiliseconds = Number(dateFromReq); //Lo transformo de string a número
      if (!Number(dateFromReq)) {
        console.log(`dateFromReq a Number es falso:`);
        return res.send({ error: "Invalid Date" });
      }
      const dateObject = new Date(dateMiliseconds);

      return res
        .status(200)
        .send({ unix: Number(dateFromReq), utc: dateObject.toUTCString() });
    }

    const nuevaFecha = new Date(parsedDateToUnix);
    console.log(`new Date(parsedDateToUnix)`);
    console.log(nuevaFecha);

    let date = Date(dateFromReq);
    console.log("Date(dateFromReq)");
    console.log(date);
    console.log(new Date(date).toUTCString());

    return res.status(200).send({
      unix: parsedDateToUnix,
      utc: nuevaFecha.toUTCString(),
    });
  } catch (error) {
    console.log(`Error en /api/:date. ${error.message}`);
    return res.send(error.message);
  }
});

app.get("/api", (req, res) => {
  try {
    let unixTime = "";
    console.log(Date.now());
    let utcTime = new Date();
    console.log(utcTime);
    console.log(utcTime.toUTCString());

    return res.json({ unix: Date.now(), utc: utcTime.toUTCString() });
  } catch (error) {
    console.log(`Error en /api. ${error.message}`);
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
