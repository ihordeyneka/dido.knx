var self = {
  connected: false,
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
    }
  },
  blinds: {
    up: function (arg) {
      iterate(arg, function (address) {

      });
    },
    down: function (arg) {
      iterate(arg, function (address) {

      });
    }
  }
};

var knx = require("knx");

var connection = new knx.Connection({
  ipAddr: '192.168.0.101',
  ipPort: 3671,
  physAddr: '15.15.255',
  debug: true,
  manualConnect: false,
  forceTunneling: true,
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

module.exports = self;