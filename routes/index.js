const express = require('express');
const index = express.Router();
const users = require('./api/users')
const login = require('./api/login')
const register = require('./api/register')
const member = require('./api/member')

index.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = function(passport){
  return [index, users, register,member,login(passport)];
} 
  
