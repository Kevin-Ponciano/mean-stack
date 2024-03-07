const express = require("express");
const hbs = require("hbs")
hbs.registerHelper('dateFormat', require('handlebars-dateformat'));
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

var path = require('path');

var appRoutes = require('./routes/app');
const { log } = require("console");

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// Configuração do CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.use('/', appRoutes);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  return res.render('index');
});

// Conexão com o banco de dados
mongoose.connect('mongodb://localhost:27017/mean-stack')
.then(() => {console.log('Connected to database!')})
.catch((err) => {console.log('Connection failed!', err)});

module.exports = app;