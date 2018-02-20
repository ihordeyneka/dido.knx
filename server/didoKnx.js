var knx = require("knx");
var connection = require('./connection/knxConnection');

var writeTrue = function (arg) {
  iterate(arg, function (address) {
    connection.write(address, 1);
  });
}

var writeFalse = function (arg) {
  iterate(arg, function (address) {
    connection.write(address, 0);
  });
}

var readAsPromise = function (address) {
  var promise = new Promise(function (resolve, reject) {
    connection.read(address, function (src, responsevalue) {
      resolve(responsevalue);
    });
  });
  return promise;
}

var iterate = function (arg, func) {
  if (Array.isArray(arg)) {
    for (var i = 0; i < arg.length; i++) {
      func(arg(i));
    }
  } else if (typeof (arg) === "string") {
    func(arg);
  }
}

var self = {
  connection: connection,
  light: {
    on: writeTrue,
    off: writeFalse,
    state: readAsPromise
  },
  blinds: {
    up: writeFalse,
    down: writeTrue,
    state: readAsPromise
  }
};

module.exports = self;