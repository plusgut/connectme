var express = require('express');
var serveStatic = require('serve-static');
var path = require('path');
var morgan = require('morgan');
var healthChecker = require('sc-framework-health-check');
var db = require('./mongoDB');

module.exports.run = function (worker) {
    console.log('   >> Worker PID:', process.pid);
    var environment = worker.options.environment;

    var app = express();

    var httpServer = worker.httpServer;
    var scServer = worker.scServer;


    /**
    * HTTP Server
    */
    app.use(function(req, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.header("Access-Control-Allow-Methods", "PUT, POST");

      next();
    });

    app.put('/:namespace/:event', handleHttpRequest);

    app.post('/:namespace/:event', handleHttpRequest);

    app.use(serveStatic(path.resolve(__dirname, 'public')));


    httpServer.on('request', app);

    console.log("listening");

    /*
      In here we handle our incoming realtime connections and listen for events.
    */
    scServer.on('connection', function (socket) {

        socket.on('hello', function (coordinates) {
            console.log("Hello Stefan!");
        });

        socket.on('disconnect', function () {
            console.log("Socket " + socket.id + " disconnected!");
        });

      console.log("New Connection with "+ socket.id +"!");  
    });




    function handleHttpRequest(req, res){
        var namespace = req.params.namespace;
        var eventReceived = req.params.event;
        console.log("Received namespace " + namespace + " and event: "+ eventReceived);
        
        scServer.exchange.publish(namespace, {
                            event: eventReceived
                        });
        db.saveLogs(namespace, eventReceived);
        res.send('Hello ConnectMe!');
    }
};

