'use strict'
const io = require('socket.io-client');
const socket = io.connect('http://localhost:9090');
console.log('socket cargado...');

module.exports =  {
    io,
    socket,
};