require('dotenv').config();

var groupAddresses = require('./server/groupAddresses');
var didoKnx = require('./server/didoKnx');
var engine = require('./server/engine');
var restify = require('restify');
var restifyCookies = require('restify-cookies');
var cleanup = require('node-cleanup');
var _ = require("lodash");
var twilio = require('twilio');

var securityCodes = [];

var server = restify.createServer();

server.use(restify.plugins.queryParser({ mapParams: true }));
server.use(restify.plugins.bodyParser({ mapParams: true }));
server.use(restify.plugins.authorizationParser());
server.use(restifyCookies.parse);

server.use(function (req, res, next) {
  if (req.cookies["username"] == process.env.KNX_ADMIN || (req.params.user == process.env.KNX_ADMIN && req.params.password == process.env.KNX_PWD)) {
    next();
    return;
  }

  var isUrlSecured = function (url) {
    if (url.startsWith("/.well-known/acme-challenge"))
      return false;
    if (url.startsWith("/login.html") || url.startsWith("/api/token") || 
      url.endsWith(".js") || url.endsWith(".js.map") || url.endsWith(".ico") || url.endsWith(".json"))
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
  if (!didoKnx.connection.connected) {
    res.send(500, "Connection to KNX is not established.");
    didoKnx.connection.Connect();
  }
  else next();
});

server.get('/api/hello/:name', function (req, res, next) {
  res.send(200, req.params.name);
  next();
});

var getRandomCode = function() {
  var result = "";
  for (var i = 0; i < 6; i++) {
    var digit = Math.floor(Math.random() * 10);
    result = result + digit;
  }
  return result; //6-digit code
};

server.get('/api/sms', function(req, res, next) {
  var code = getRandomCode();

  const accountSid = process.env.TWILIO_SID;
  const authToken = process.env.TWILIO_KEY;
  const client = twilio(accountSid, authToken);

  client.messages.create({
    body: code + ' - dido.knx - your security code.',
    to: process.env.TWILIO_TO, //from env
    from: process.env.TWILIO_FROM //from env
  })
  .then((message) => {
    securityCodes.push(code);
    _.delay(function() { _.remove(securityCodes, (c) => c == code) }, 30*60*1000); //sms code valid for 30min

    res.send(200, 'Check your SMS');
    next();
  })
  .catch(() => {
    res.send(500, 'Twilio could not send SMS');
    next();
  });  
});

server.get('/api/:category/:name', function (req, res, next) {
  var address = groupAddresses[req.params.category][req.params.name];
  didoKnx.state(address).then(function (result) {
    res.send(200, { state: result[0] });
    next();
  });
});

var guessCommand = function(name) {
  if (name.endsWith("down"))
    return "down";
  if (name.endsWith("up"))
    return "up";
  if (name.endsWith("on"))
    return "on";
  if (name.endsWith("off"))
    return "off";
  
  return "on";
}

server.get('/api/:category', function (req, res, next) {
  var category = groupAddresses[req.params.category];
  var addresses = Object.keys(category).map(x => ({
    Name: x,
    Address: category[x],
    State: 0,
    Command: guessCommand(x)
  }));
  res.send(200, addresses);
  next();
});

server.post('/api/:category/:command/:name', function (req, res, next) {
  var category = req.params.category;
  var command = req.params.command;
  var code = req.params.code;
  
  if (category == "alarm") {
    if (_.every(securityCodes, (c) => c != code)) {
      res.send(403, "Invalid code");
      next();
      return;
    }
  }

  if (category == "blinds" && command == "stop") {
    category = "blinds_stop";
  }

  var address = groupAddresses[category][req.params.name];

  if (didoKnx.commands[command] && address != null) {
    didoKnx.commands[command](address);
    res.send(200);
  }
  else {
    res.send(400, "Unsupported operation.");
  }
  
  next();
});

/* BEGIN - AUTH and FAKE OAUTH */

var magicSuffix = 'f';
var magicAccessToken = 'MTQ0NjJkZmQ5OTM2NDE1ZTZjNGZmZjI3';

server.get('/login.html*', restify.plugins.serveStatic({
  directory: './dist'
}));

server.post('/login.html', function (req, res, next) {
  if (req.params.user == process.env.KNX_ADMIN && req.params.password == process.env.KNX_PWD) {
    res.setCookie("username", req.params.user, { httpOnly: true });

    var redirectUri = req.params.redirect_uri;
    if (redirectUri) {
      var state = req.params.state;
      var code = Math.random().toString(36).substring(2) + (new Date()).getTime().toString(36) + magicSuffix;
      redirectUri += `?state=${state}&code=${code}`;
      res.redirect(redirectUri, next);
    } else {
      res.redirect('/', next);
    }
  } else {
    res.redirect('/login.html', next);
  }
});

server.post('/api/token', function (req, res, next) {
  var code = req.params.code;
  if (code && code.endsWith(magicSuffix)) {
    var response = {
      "access_token": magicAccessToken,
      "token_type": "bearer",
      "expires_in": 30 * 365 * 24 * 60 * 60, // approx. 30 years
      "refresh_token": "IwOGYzYTlmM2YxOTQ5MGE3YmNmMDFkNTVk"
   }
    res.json(response, {
      'Cache-Control': 'no-store',
      'Pragma': 'no-cache'
    });
  } else {
    res.send(401, req.params.name);
  }
  next();
});

/* END - AUTH and FAKE OAUTH */

server.get(/\/?.*/, restify.plugins.serveStatic({
  directory: './dist',
  default: 'index.html'
}));

cleanup(function (exitCode, signal) {
  console.log("restify server closing...");
  if (didoKnx.connection.connected)
    didoKnx.connection.Disconnect();
});

engine.start(server.server);

server.listen(process.env.KNX_HTTP_PORT || 8787, function () {
  console.log('%s listening at %s', server.name, server.url);
});
