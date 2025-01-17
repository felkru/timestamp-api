// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.get("/api/", function (req, res) {
  let date = new Date();
  let unix = date.getTime();
  date = date.toUTCString();
  res.json({ unix: unix, utc: date });
});

// your first API endpoint...
app.get("/api/:date", function (req, res) {
  // format date as Fri, 25 Dec 2015 00:00:00 GMT
  let date = /\D/.test(req.params.date)
    ? new Date(req.params.date)
    : new Date(parseInt(req.params.date));
  // convert date to unix
  let unix = date.getTime();
  date = date.toUTCString();
  if (date === "Invalid Date") {
    res.json({ error: "Invalid Date" });
    return;
  }
  res.json({ unix: unix, utc: date });
});

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
