var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var User = new Schema({
	name: {
    type: String,
    required: true
  },
  userType: {
    //0 if supplier, 1 if demander
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  zipCode: {
    type: Number,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  phoneNum: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    required: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
	endDate: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    required: true
  }
});

module.exports = mongoose.model('User', User);