var groupAddresses = require('./groupAddresses');
var didoKnx = require('./didoKnx');
var socketio = require('socket.io');
var _ = require("lodash");
var schedule = require('node-schedule');

var io = null;

var handleChange = function (addr, value) {
  if (!io)
    return;

  //1. emit socket.io event
  io.emit('knx_write', { Address: addr, State: value });

  //2. process vents
  var group = groupAddresses.getByAddress(addr);
  if (group != null && group.Category == "vents" && value == 1) {
    var timeout = process.env.KNX_VENT_TIMEOUT || 300;
    _.delay(function () {
      didoKnx.commands.off(addr); //turn off vent after some time automatically
    }, timeout * 1000);
  }
}

var self = {
  listen: function (server) {
    io = socketio.listen(server);
 
    didoKnx.connection.on('GroupValue_Write', function (src, dest, value) {
      handleChange(dest, value[0]);
    });
    didoKnx.connection.on('GroupValue_Write_Manual', function (src, dest, value) {
      handleChange(dest, value);
    });

    schedule.scheduleJob({hour: 00, minute: 55}, function() { //blinds 1 down and light off at 00:55AM
      var addressBlinds = groupAddresses.findAddress("scenes", "Blinds 1 down");
      didoKnx.commands.down(addressBlinds);

      var addressLight = groupAddresses.findAddress("scenes", "Light off");
      didoKnx.commands.off(addressLight);
    });

    schedule.scheduleJob({hour: 07, minute: 00}, function() { //blinds 1 up at 07:00AM
      var addressBlinds = groupAddresses.findAddress("scenes", "Blinds 1 up");
      didoKnx.commands.up(addressBlinds);
    });
  }
};

module.exports = self;