var knx = require('knx');

var connection = new knx.Connection({
  ipAddr: process.env.KNX_IP_ADDR,
  ipPort: process.env.KNX_IP_PORT,
  physAddr: '15.15.255',
  debug: process.env.KNX_ENV === "debug",
  manualConnect: false,
  minimumDelay: 10,
  handlers: {
    connected: function () {
      console.log('Established connection to KNX!');
      connection.connected = true;
    },
    error: function (connstatus) {
      console.log("**** ERROR: %j", connstatus);
    }
  }
});

connection.connected = false;

module.exports = connection;