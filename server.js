const http = require('http');
const morgan = require('morgan');
const express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser')

const router = require('./router.js');

let httpServer;

function initialize() {
  return new Promise((resolve, reject) => {
    const app = express();

    app.use(morgan('combined'));

    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Origin", "http://localhost:8080");     
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json()) 

    app.use(cors())

    app.use('/api', router);    

    httpServer = http.createServer(app);

    httpServer.listen(3000, err => {
      if (err) {
        reject(err);
        return;
      }
      console.log(`Web server listening on localhost:3000`);
      resolve();
    });
  });
}

module.exports.initialize = initialize; 

function close() {
  return new Promise((resolve, reject) => {
    httpServer.close((err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve();
    });
  });
}
module.exports.close = close;