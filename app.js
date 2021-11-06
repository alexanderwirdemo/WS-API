// Importera
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require('express-session');
const mongoDBStore = require("connect-mongodb-session")(session);
const cookieParser = require('cookie-parser');

// Läs in Schemana
var Student = require("./models/student.js");
var Module = require("./models/module.js");
var Registrering = require("./models/register.js");
var Result = require("./models/result.js");

//const cors = require('cors');

// Anslut till databasen
//mongoose.connect("mongodb://localhost:27017/antiquitiesdb", { useNewUrlParser: true, useUnifiedTopology: true });
//mongoose.connect("mongodb+srv://admin:ltuservice@ltu-rest-ws.mwzyn.mongodb.net/Webservice?retryWrites=true&w=majority", { useNewUrlParser: true }, { useUnifiedTopology: true });

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

// cookie-parser
//app.use(cookieParser());

/*
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:ltuservice@ltu-rest-ws.mwzyn.mongodb.net";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    console.log('Error:')
    console.log(err);
  const collection = client.db("test").collection("devices");
  client.close();
});*/

// Port
const port = process.env.PORT || 3034;

// Express-session
/*
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use((req, res, next) => {
    console.dir(req.cookies.user_id);
    if (req.cookies.user_id && !req.session.user) {
        res.clearCookie('user_sid');        
    }
    next();
});*/

// Body parser
//app.use(bodyParser.json());
//app.use(bodyParser.urlencoded( { extended: false}));

require("./routes/webservice")(app, Module, Registrering, Student, Result);

// Skapa statisk sökväg
//app.use(express.static(path.join(__dirname, 'public'))); // fixa

//app.use(cors());

// Starta servern
app.listen(port, function() {
    console.log("Server running on port " + port);
  });