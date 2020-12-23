const home = require('./api/home');
const users = require('./api/users')
const login = require('./api/login')
const register = require('./api/register')
const member = require('./api/member')

module.exports = function(passport){
  return [home, users, register,member,login(passport)];
} 
  
