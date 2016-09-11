var express = require('express');
var app = express();
var path = require("path");
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('./user');
var async = require('async');



var mongooseUri = 'mongodb://heroku_sxhdb4dm:1puo2edksdg3jtg9biq1rrsm7@ds019481.mlab.com:19481/heroku_sxhdb4dm';
mongoose.connect(mongooseUri, function(err, res) {
	if (err) {
		console.log("Error connecting to " + mongooseUri + ": " + err);
	} else {
		console.log("Successfully connected to " + mongooseUri);
	}
});


app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, '/public')));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.render("main-page");
});

app.post('/', function (req, res) {
  res.render("main-page");
});

app.post('/store', function (req, res) {
  res.render("buy-initial");
});

app.post('/storage', function (req, res) {
	res.render("sell-initial");
});

app.get('/lists', function (req, res) {
  console.log(req.query)
	parseData2(req.query, function(data){
		var getUser = function(callback) {
			var date = new Date()

			User.find({
			 	userType : 0,
			 	zipCode : data.zipCode,
			 	quantity : {$gte: data.quantity},
			 	startDate : {$lte: date.setDate(data.startDate.getDate()+5)},
			 	endDate : {$gte: date.setDate(data.endDate.getDate()-5)},
				price : {$lte: data.price}
			}).
			sort({price: -1}).
			limit(20).
			exec(function(err, results) {
				callback(err, results)})
		}

		async.parallel({
			users : getUser
		}, function(err, data) {
			if (err) {
				res.status(400).json(err)
			} else {
				var param = {
					myAddress: req.query.address
				}
				param.users = data.users
				console.log(param);
				res.render('lists', param || {});
			}
		});
	});
});

app.post('/success', function (req, res) {
  console.log(req.body);
  parseData(req.body, function(data){
		var user = new User(data);
		user.save(function(err) {
			if (err) {
				res.status(400).json(err);
			} else {
				res.render("success");
			}
		});
	});
});


function parseData (data, callback) {
	data.userType = parseInt(data.userType)
	data.zipCode = parseInt(data.zipCode)
	data.latitude = parseInt(data.latitude)
	data.longitude = parseInt(data.longitude)
	data.phoneNum = parseInt(data.phoneNum)
	data.quantity = parseInt(data.quantity)
	data.price = parseInt(data.price)
	data.startDate = new Date(data.startDate)
	data.endDate = new Date(data.endDate)

	callback(data)
}

function parseData2 (data, callback){
	data.zipCode = parseInt(data.zipCode)
	data.quantity = parseInt(data.quantity)
	data.startDate = new Date(data.startDate)
	data.endDate = new Date(data.endDate)
	data.price = parseInt(data.price)

	callback(data)
}


app.listen(process.env.PORT || 3000, function () {
  console.log('Example app listening on port 3000!');
});
