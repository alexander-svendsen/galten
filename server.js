//require modules
var express = require('express');
var mongoose = require('mongoose/');
var config = require('./config');
var Message = require('./model/message');
var bodyParser  = require('body-parser');
var request = require('request');


var app = express();
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

//setup mongoose
db = mongoose.connect(config.creds.mongoose_auth_local)


// This function is responsible for returning all entries for the Message model
function getMessages(req, res, next) {
  // .find() without any arguments, will return all results
  // the `-1` in .sort() means descending order
  Message.find().sort({date: 'asc' }).exec(function (arr, data) {
    res.jsonp(data);

  });
}

function postMessage(req, res, next) {
  // Create a new message model, fill it up and save it to Mongodb
  var message = new Message();
  message.message = req.body.message;
  message.author = req.body.author;
  message.date = new Date();
  message.save(function () {
    res.jsonp(req.body);
  });
}


app.use('/weather', function(req, res) {
  var url = "http://api.openweathermap.org/data/2.5/weather";
  var qs = {
    lat: 68.651751,
    lon: 15.524236,
    appid: config.creds.openweather_api_key,
    units: "metric"}
  req.pipe(request({url: url, qs:qs })).pipe(res);
});

// Set up our routes and start the server
app.get('/messages', getMessages);
app.post('/messages', postMessage);

app.listen(8080);
console.log("Server up and running on port 8080");
