var groupAddresses = require('./groupAddresses');
var didoKnx = require('./didoKnx');
var restify = require('restify');
var cleanup = require('node-cleanup');

var server = restify.createServer();

server.pre(function (req, res, next) {
  if (!didoKnx.connected)
    res.send(500, "Connection to KNX is not established.");
  else if (!groupAddresses.data)
    res.send(500, "Group Addresses XML could not be parsed.");
  else next();
});

server.get('/hello/:name', function (req, res, next) {
  res.send(200, req.params.name);
  next();
});

server.get('/light/:name', function (req, res, next) {
  var address = groupAddresses.findAddress("Light", req.params.name);
  didoKnx.light.state(address).then(function (result) {
    res.send(200, JSON.stringify(result));
    next();
  });
});

server.get('/light', function (req, res, next) {
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
          State: state
        });
      });
  }

  chain.then(function () {
    res.send(200, JSON.stringify(result));
    next();
  });

  return;

  //--old code
  var promises = [];

  for (var i = 0; i < addresses.length; i++) {
    let address = addresses[i];

    let promise = didoKnx.light.state(address.Address).then(function (state) {
      result.push({
        Name: address.Name,
        Address: address.Address,
        State: state
      });
    });
    promises.push(promise);
  }

  Promise.all(promises).then(function () {
    res.send(200, JSON.stringify(result));
    next();
  });
});

server.post('/light/:operation/:name', function (req, res, next) {
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

server.get('/blinds', function (req, res, next) {
  var addresses = groupAddresses.filter("Blinds");
  var result = [];
  for (var i = 0; i < addresses.length; i++) {
    var address = addresses[i];
    var state = didoKnx.blinds.state(address);
    result.push({
      Name: address.Name,
      Address: address.Address,
      State: state
    });
  }
  res.send(200, JSON.stringify(result));
  next();
});

//get single blind

server.post('/blinds/:operation/:name', function (req, res, next) {
  var address = groupAddresses.findAddress("Blinds", req.params.name + " " + req.params.operation);

  if (!address) {
    res.send(400, "Could not find address by operation and name.");
    next();
    return;
  }

  didoKnx.blinds.execute(address);
  res.send(200);
  next();
});

server.get(/\/?.*/, restify.plugins.serveStatic({
  directory: '../dist',
  default: 'index.html'
}));

cleanup(function (exitCode, signal) {
 console.log("restify server closing...");
  if (didoKnx.connected)
    didoKnx.connection.Disconnect();
});

server.listen(8787, function () {
  console.log('%s listening at %s', server.name, server.url);
});