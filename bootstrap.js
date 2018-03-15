require('dotenv').config();

var groupAddresses = require('./server/groupAddresses');
var didoKnx = require('./server/didoKnx');
var restify = require('restify');
var restifyCookies = require('restify-cookies');
var socketio = require('socket.io');
var cleanup = require('node-cleanup');

var server = restify.createServer();

server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.bodyParser({ mapParams: true }));
server.use(restify.plugins.authorizationParser());
server.use(restifyCookies.parse);

server.use(function (req, res, next) {
  if (req.cookies["username"] == process.env.KNX_ADMIN) {
    next();
    return;
  }

  var isUrlSecured = function (url) {
    if (url.startsWith("/.well-known/acme-challenge"))
      return false;
    if (url == "/login.html" || url.endsWith(".js") || url.endsWith(".js.map") || url.endsWith(".ico") || url.endsWith(".json"))
      return false;
    return true;
  }

  if (isUrlSecured(req.url) && (req.username == 'anonymous' || !users[req.username] || req.authorization.basic.password !== users[req.username].password)) {
    res.redirect('/login.html', next);
  } else {
    next();
  }
});

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

server.get('/api/:category/:name', function (req, res, next) {
  var address = groupAddresses.findAddress(req.params.category, req.params.name);
  didoKnx.state(address).then(function (result) {
    res.send(200, result[0]);
    next();
  });
});

server.get('/api/:category', function (req, res, next) {
  var addresses = groupAddresses.filter(req.params.category);
  var result = [];

  var chain = Promise.resolve(null);

  for (var i = 0; i < addresses.length; i++) {
    let address = addresses[i];
    chain = chain
      .then(function () {
        return didoKnx.state(address.Address)
      })
      .then(function (state) {
        result.push({
          Name: address.Name,
          Address: address.Address,
          Command: address.Command,
          State: state[0]
        });
      });
  }

  chain.then(function () {
    res.send(200, result);
    next();
  });
});

server.post('/api/:category/:command/:name', function (req, res, next) {
  var address = groupAddresses.findAddress(req.params.category, req.params.name);

  if (didoKnx.commands[req.params.command] && address != null) {
    didoKnx.commands[req.params.command](address);
    res.send(200);
  }
  else {
    res.send(400, "Unsupported operation.");
  }
  
  next();
});

server.get('/login.html', restify.plugins.serveStatic({
  directory: './dist'
}));

server.post('/login.html', function (req, res, next) {
  if (req.params.user == process.env.KNX_ADMIN && req.params.password == process.env.KNX_PWD) {
    res.setCookie("username", req.params.user, { httpOnly: true });
    res.redirect('/', next);
  } else {
    res.redirect('/login.html', next);
  }
});

server.get(/\/?.*/, restify.plugins.serveStatic({
  directory: './dist',
  default: 'index.html'
}));

cleanup(function (exitCode, signal) {
  console.log("restify server closing...");
  if (didoKnx.connection.connected)
    didoKnx.connection.Disconnect();
});

var io = socketio.listen(server.server);

didoKnx.connection.on('GroupValue_Write', function (src, dest, value) {
  io.emit('knx_write', { Address: dest, State: value[0] });
});

server.listen(process.env.KNX_HTTP_PORT || 8787, function () {
  console.log('%s listening at %s', server.name, server.url);
});
