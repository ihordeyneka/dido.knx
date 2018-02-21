var connection = {
  connected: true,
  write: function (addr) { }, //do nothing 
  read: function (addr, callback) {
    callback(addr, [Math.round(Math.random())]);
  },
  Disconnect: function () {
    console.log("KNX connection is closed, so you can create a new one later");
  },
  on: function () { }
};

module.exports = connection;