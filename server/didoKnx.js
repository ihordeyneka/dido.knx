var knx = require("knx");
var connection = require('./connection/' + process.env.KNX_CONN);
const log = require('simple-node-logger').createSimpleFileLogger('knx.log');

var writeValue = function (address, value) {
  log.info("write start:" + address + " - " + value);
  connection.write(address, value, null, function () {
    log.info("write end:" + address + " - " + value);
    connection.emit("GroupValue_Write_Manual", connection.physAddr, address, value); //manually triggering groupvaluewrite event
  });
}

var writeTrue = function (address) {
  writeValue(address, 1);
}

var writeFalse = function (address) {
  writeValue(address, 0);
}

var readAsPromise = function (address) {
  log.info("read start:" + address);
  var promise = new Promise(function (resolve, reject) {
    log.info("read start promise:" + address);
    connection.read(address, function (src, responsevalue) {
      log.info("read end:" + address + " - " + responsevalue[0]);
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
    down: writeTrue,
    stop: writeTrue
  }
};

module.exports = self;