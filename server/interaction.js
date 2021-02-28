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
    delayedTurnOff(process.env.KNX_VENT_TIMEOUT || 300, addr);
  }

  //3. process sensors
  if (addr == groupAddresses.alarm.garageSensor && value == 1) {
    delayedTurnOff(120, addr);
  }

  if (addr == groupAddresses.alarm.entranceSensor && value == 1) {
    delayedTurnOff(60, addr);
  }
}

var delayedTurnOff = function(timeout, addr) {
  _.debounce(function () {
    didoKnx.commands.off(addr); //turn off after some time automatically
  }, timeout * 1000);
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

    schedule.scheduleJob({hour: 00, minute: 55}, function() { //blinds 1 down, light off and arm at 00:55AM
      var addressBlinds = groupAddresses.findAddress("scenes", "Blinds 1 down");
      didoKnx.commands.down(addressBlinds);

      var addressLight = groupAddresses.findAddress("scenes", "Light off");
      didoKnx.commands.off(addressLight);

      didoKnx.commands.on(groupAddresses.alarm.arm);
    });

    schedule.scheduleJob({hour: 07, minute: 00}, function() { //blinds 1 up and disarm at 07:00AM
      var addressBlinds = groupAddresses.findAddress("scenes", "Blinds 1 up");
      didoKnx.commands.up(addressBlinds);

      didoKnx.commands.on(groupAddresses.alarm.disarm); //ignored during vacation
    });
  }
};

module.exports = self;