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
      res.header("Access-Control-Allow-Origin", "http://localhost:8080"); // update to match the domain you will make the request from      
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json()) 

    app.use('/api', router);

    app.use(cors())

    app.get('/', (req, res) => {
      res.end('Ingrese /api para navegar!');
    });

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