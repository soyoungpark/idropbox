var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  res.sendFile(__dirname + "/views/main.html");
});

// router.post('/', function (req, res) {
//   res.sendFile(__dirname + "../views/main.html");
// });

// router.post('/store', function (req, res) {
//   res.sendFile(__dirname + "/views/store.html");
// });

// router.post('/storage', function (req, res) {
//   res.sendFile(__dirname + "/views/storage.html");
// });

// router.post('/lists', function (req, res) {
//   console.log(req.body);
//   res.sendFile(__dirname + "/views/lists.html");
// });

// router.post('/success', function (req, res) {
//   console.log(req.body);
//   res.sendFile(__dirname + "/views/success.html");
// });

module.exports = router;