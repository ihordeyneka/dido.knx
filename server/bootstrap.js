var groupAddresses = require('./groupAddresses');
var didoKnx = require('./didoKnx');
var restify = require('restify');
var cleanup = require('node-cleanup');

var server = restify.createServer();

server.pre(function (req, res, next) {
  if (!didoKnx.connection.connected)
    res.send(500, "Connection to KNX is not established.");
  else if (!groupAddresses.data)
    res.send(500, "Group Addresses XML could not be parsed.");
  else next();
});

server.get('/api/hello/:name', function (req, res, next) {
  res.send(200, req.params.name);
  next();
});

server.get('/api/light/:name', function (req, res, next) {
  var address = groupAddresses.findAddress("Light", req.params.name);
  didoKnx.light.state(address).then(function (result) {
    res.send(200, JSON.stringify(result[0]));
    next();
  });
});

server.get('/api/light', function (req, res, next) {
  var addresses = groupAddresses.filter("Light");
  var result = [];

  var chain = Promise.resolve(null);

  for (var i = 0; i < addresses.length; i++) {
    let address = addresses[i];
    chain = chain
      .then(function () {
        return didoKnx.light.state(address.Address)
      })
      .then(function (state) {
        result.push({
          Name: address.Name,
          Address: address.Address,
          State: state[0]
        });
      });
  }

  chain.then(function () {
    res.send(200, JSON.stringify(result));
    next();
  });
});

server.post('/api/light/:operation/:name', function (req, res, next) {
  var address = groupAddresses.findAddress("Light", req.params.name);

  if (req.params.operation == "on")
    didoKnx.light.on(address);
  else if (req.params.operation == "off")
    didoKnx.light.off(address);
  else {
    res.send(400, "Unsupported operation.");
    next();
    return;
  }

  res.send(200);
  next();
});

server.get('/api/blinds', function (req, res, next) {
  var addresses = groupAddresses.filter("Blinds");
  var result = [];

  var chain = Promise.resolve(null);

  for (var i = 0; i < addresses.length; i++) {
    let address = addresses[i];
    chain = chain
      .then(function () {
        return didoKnx.light.state(address.Address)
      })
      .then(function (state) {
        result.push({
          Name: address.Name,
          Address: address.Address,
          State: state[0]
        });
      });
  }

  chain.then(function () {
    res.send(200, JSON.stringify(result));
    next();
  });
});

server.get('/api/blinds/:name', function (req, res, next) {
  var address = groupAddresses.findAddress("Blinds", req.params.name);
  didoKnx.light.state(address).then(function (result) {
    res.send(200, JSON.stringify(result[0]));
    next();
  });
});

server.post('/api/blinds/:operation/:name', function (req, res, next) {
  var address = groupAddresses.findAddress("Blinds", req.params.name);

  if (req.params.operation == "up")
    didoKnx.blinds.up(address);
  else if (req.params.operation == "down")
    didoKnx.blinds.down(address);
  else {
    res.send(400, "Unsupported operation.");
    next();
    return;
  }

  res.send(200);
  next();
});

server.get(/\/?.*/, restify.plugins.serveStatic({
  directory: '../dist',
  default: 'index.html'
}));

cleanup(function (exitCode, signal) {
  console.log("restify server closing...");
  if (didoKnx.connection.connected)
    didoKnx.connection.Disconnect();
});

server.listen(8787, function () {
  console.log('%s listening at %s', server.name, server.url);
});