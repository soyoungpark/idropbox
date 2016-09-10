var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./user');



var mongooseUri = 'mongodb://heroku_sxhdb4dm:1puo2edksdg3jtg9biq1rrsm7@ds019481.mlab.com:19481/heroku_sxhdb4dm';
mongoose.connect(mongooseUri, function(err, res) {
	if (err) {
		console.log("Error connecting to " + mongooseUri + ": " + err);
	} else {
		console.log("Successfully connected to " + mongooseUri);
		//var collection = 
	}
});



app.use(express.static(path.join(__dirname, 'views')));

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json 
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/views/main.html");
});

app.post('/', function (req, res) {
  res.sendFile(__dirname + "/views/main.html");
});

app.post('/store', function (req, res) {
  res.sendFile(__dirname + "/views/store.html");
});

app.post('/storage', function (req, res) {
  res.sendFile(__dirname + "/views/storage.html");
});

app.post('/lists', function (req, res) {
  console.log(req.body)
  //console.log('made post request to /lists');
	parseData(req.body, function(data){
		var user = new User(data)
		user.save(function(err) {
			if (err) {
				res.status(400).json(err)
			} else {
				console.log('post success; status not 400');
				//console.log(res); // prints literally everything, including tcp stuff, socket, request header, body, etc.

				res.sendFile(__dirname + "/views/lists.html");

				console.log('get request to /lists');
				User.find({}, function (err, docs) {
					if (err) {
						console.log('data retrieval fail');
					} else {
						console.log('got data!');
						res.json(docs);
					}
				    
				});



				
			}
		})
	})

  
});

app.get('/lists', function (req, res) {
	console.log('get request to /lists');
    User.find({}, function (err, docs) {
    	if (err) {
    		console.log('data retrieval fail');
    	} else {
    		console.log('got data!');
    		res.json(docs);
    	}
        
    });
});


app.post('/success', function (req, res) {
  console.log(req.body);
  res.sendFile(__dirname + "/views/success.html");
});


function parseData (data, callback) {
	data.userType = parseInt(data.userType)
	data.zipCode = parseInt(data.zipCode)
	data.latitude = parseInt(data.latitude)
	data.longitude = parseInt(data.longitude)
	data.phoneNum = parseInt(data.phoneNum)
	data.quantity = parseInt(data.quantity)
	data.price = parseInt(data.price)
	data.startDate = Date.parse(data.startDate)
	data.endDate = Date.parse(data.endDate)

	callback(data)
}


app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});