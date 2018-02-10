var self = {
  connected: false,
  connection: null,
  light: {
    on: function (arg) {
      iterate(arg, function (address) {
        connection.write(address, 1);
      });
    },
    off: function (arg) {
      iterate(arg, function (address) {
        connection.write(address, 0);
      });
    },
    state: function (address) {
      var promise = new Promise(function (resolve, reject) {
        connection.read(address, function (src, responsevalue) {
          resolve(responsevalue);
        });
      });
      return promise;
    }
  },
  blinds: {
    execute: function (arg) {
      iterate(arg, function (address) {
        connection.write(address, 1);
      });
    },
    state: function (address) {
      var promise = new Promise(function (resolve, reject) {
        connection.read(address, function (src, responsevalue) {
          resolve(responsevalue);
        });
      });
      return promise;
    }
  }
};

var knx = require("knx");

//MOCK
//self.connected = true;
//var connection = {
//  write: function (addr) { }, //do nothing 
//  read: function (addr, callback) {
//    callback(addr, Math.round(Math.random()));
//  },
//  Disconnect: function () {
//    console.log("KNX connection is closed, so you can create a new one later");
//  }
//};

var connection = new knx.Connection({
  ipAddr: '192.168.0.106',
  ipPort: 3671,
  physAddr: '15.15.255',
  debug: true,
  manualConnect: false,
  //forceTunneling: true,
  minimumDelay: 10,
  handlers: {
    connected: function () {
      console.log('Hurray, I can talk KNX!');
      self.connected = true;
    },
    event: function (evt, src, dest, value) {
      console.log(
        "event: %s, src: %j, dest: %j, value: %j",
        evt, src, dest, value
      );
    },
    error: function (connstatus) {
      console.log("**** ERROR: %j", connstatus);
    }
  }
});

var iterate = function (arg, func) {
  if (Array.isArray(arg)) {
    for (var i = 0; i < arg.length; i++) {
      func(arg(i));
    }
  } else if (typeof (arg) === "string") {
    func(arg);
  }
}
self.connection = connection;

module.exports = self;