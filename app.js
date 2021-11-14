// Importera
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require('cors');
const session = require('express-session');
const mongoDBStore = require("connect-mongodb-session")(session);
const cookieParser = require('cookie-parser');

// Läs in Schemana
var Student = require("./models/student.js");
var Module = require("./models/module.js");
var Registrering = require("./models/register.js");
var Result = require("./models/result.js");

const username = "admin";
const password = "ltuservice";
const cluster = "ltu-rest-ws";
const dbname = "Webservice";

// Ansluta till MongoDB
mongoose.connect(
    //`mongodb+srv://admin:ltuservice@ltu-rest-ws.mwzyn.mongodb.net/Webservice?retryWrites=true&w=majority`,
  
    `mongodb+srv://${username}:${password}@${cluster}.mwzyn.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
  {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }
);

// Anslutningen till databasen
const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection error: "));
db.once("open", function () {
  console.log("Connected successfully");
});

// Skapa instans av express
const app = express();

// Port
const port = process.env.PORT || 3036;

// Body parser
app.use(bodyParser.json());

app.use(cors());

require("./routes/webservice")(app, Module, Registrering, Student, Result);

// Starta servern
app.listen(port, function() {
    console.log("Server running on port " + port);
  });