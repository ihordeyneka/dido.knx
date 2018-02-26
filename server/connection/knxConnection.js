var knx = require('knx');

var connection = new knx.Connection({
  ipAddr: '192.168.0.106',
  ipPort: 3671,
  physAddr: '15.15.255',
  debug: process.env.ENV === "debug",
  manualConnect: false,
  //forceTunneling: true,
  minimumDelay: 10,
  handlers: {
    connected: function () {
      console.log('Hurray, I can talk KNX!');
      connection.connected = true;
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

connection.connected = false;

module.exports = connection;