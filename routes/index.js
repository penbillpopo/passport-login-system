var express = require('express');
var index = express.Router();
var users = require('./api/users')
var register = require('./api/register')

index.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = [index, users, register];
