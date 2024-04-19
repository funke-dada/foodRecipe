var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function async(req, res, next) {
  const users = [
    {id: 1, name: 'Alice'},
    {id: 2, name: 'Bob'},
    {id: 3, name: 'Dayo'},
    {id: 4, name: 'Olu'},
  ]
  res.send(users);
});

module.exports = router;
