'use strict';

var sys = require('sys');
var exec = require('child-process-promise').exec;

var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    errorHandler = require('errorhandler'),
    hostname = process.env.HOSTNAME || '0.0.0.0',
    port = 6969;

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
    console.log(r.stdout)
    console.err(r.stderr)
    res.send(r.stdout);
  });
});

console.log('Worker listening at http://%s:%s', hostname, port);
app.listen(port, hostname);
