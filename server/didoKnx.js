var knx = require("knx");
var connection = require('./connection/' + process.env.KNX_CONN);

var writeTrue = function (address) {
  connection.write(address, 1);
}

var writeFalse = function (address) {
  connection.write(address, 0);
}

var readAsPromise = function (address) {
  var promise = new Promise(function (resolve, reject) {
    connection.read(address, function (src, responsevalue) {
      resolve(responsevalue);
    });
  });
  return promise;
}

var self = {
  connection: connection,
  state: readAsPromise,
  commands: {
    on: writeTrue,
    off: writeFalse,
    up: writeFalse,
    down: writeTrue
  }
};

module.exports = self;