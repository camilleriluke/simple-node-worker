'use strict';

var sys = require('sys');
var exec = require('child-process-promise').exec;

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    hostname = process.env.HOSTNAME || 'localhost',
    port = 8181;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(errorHandler({
  dumpExceptions: true,
  showStack: true
}));

app.post('/', function (req, res) {
  exec('sh ./update_site.sh').then(function(r) {
    res.send(r.stdout);
  });
});

console.log('Worker listening at http://%s:%s', hostname, port);
app.listen(port, hostname);