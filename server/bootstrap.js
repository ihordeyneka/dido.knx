//get group addresses from file system
var groupAddresses = require('./groupAddresses');

//get knx connection
var didoKnx = require('./didoKnx');

//initialize web server
var restify = require('restify');

var server = restify.createServer();

server.pre(function (req, res, next) {
  if (!didoKnx.connected)
    res.send(500, "Connection to KNX is not established.");
  if (!groupAddresses.data)
    res.send(500, "Group Addresses XML could not be parsed.");
  next();
});

server.get('/hello/:name', function (req, res, next) {
  res.send(200);
  console.log(groupAddresses.find("Light", "Kitchen Sink"));
  console.log(groupAddresses.filter("On/Off"));
  next();
});

server.get('/light/:operation/:name', function (req, res, next) {
  var addr = req.params.name ?
    groupAddresses.find("Light", req.params.name) :
    addr = groupAddresses.filter("Light");

  if (req.params.operation == "on")
    didoKnx.light.on(addr);
  else if (req.params.operation == "off")
    didoKnx.light.off(addr);
  else {
    res.send(400, "Unsupported operation.");
    next();
    return;
  }

  res.send(200);
  next();
});


server.listen(8787, function () {
  console.log('%s listening at %s', server.name, server.url);
});