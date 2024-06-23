var groupAddresses = require('./groupAddresses');
var didoKnx = require('./didoKnx');
var socketio = require('socket.io');
var _ = require("lodash");
var schedule = require('node-schedule');
var SunCalc = require('suncalc');

var io = null;
var daylight = {
  from: {
    hour: 7,
    minute: 00
  },
  to: {
    hour: 16,
    minute: 30
  }
};
var sensorsMap = {};

var setSensors = function() {
  sensorsMap[groupAddresses.alarm["Garage sensor"]] = { cooldown: null, target: groupAddresses.light.Garage };
  sensorsMap[groupAddresses.alarm["Entrance sensor"]] = { cooldown: null, target: groupAddresses.light.Entrance };
  //sensorsMap[groupAddresses.alarm["Kitchen sensor"]] = { cooldown: null, target: groupAddresses.light["Kitchen Island"] };
  sensorsMap[groupAddresses.alarm["Shower sensor"]] = { cooldown: null, target: groupAddresses.vents["Shower Vent"] };
}

var toHourMinute = function(date) {
  return {
    hour: date.getHours(),
    minute: date.getMinutes()
  };
}

var setDaylight = function() {
  var villageLat = 49.759203;
  var villageLng = 23.954973
  var times = SunCalc.getTimes(new Date(), villageLat, villageLng);

  //golden hour is the period of daytime shortly after sunrise or before sunset
  if (times.goldenHourEnd && times.goldenHour) {
    daylight.from = toHourMinute(times.goldenHourEnd);
    daylight.to = toHourMinute(times.goldenHour);
  }
}

var isDaylight = function() {
  var time = toHourMinute(new Date());
  if (daylight.from.hour < time.hour && time.hour < daylight.to.hour)
    return true;

  if (daylight.from.hour === time.hour)
    return daylight.from.minute <= time.minute;

  if (time.hour === daylight.to.hour)
    return time.minute <= daylight.to.minute;

  return false;
}

var handleChange = function (addr, value) {
  if (!io)
    return;

  //1. emit socket.io event
  io.emit('knx_write', { Address: addr, State: value });

  //2. process vents
  if ((addr == groupAddresses.vents["Bathroom Vent"] || addr == groupAddresses.vents["Shower Vent"]) && value == 1) {
    delayedTurnOff(process.env.KNX_VENT_TIMEOUT || 300, addr);
  }

  //3a. process sensors, turn on
  var sensor = sensorsMap[addr];
  if (sensor && value == 1 && (addr == groupAddresses.alarm["Shower sensor"] || !isDaylight())) {
    if (!sensor.cooldown) {
      didoKnx.commands.on(sensor.target);
      delayedTurnOff(900, sensor.target);
    }
  }

  //3b. block automatic turn on for 2min if we deliberately turn off
  var linkedSensorAddr = _.find(Object.keys(sensorsMap), k => sensorsMap[k].target == addr);
  if (linkedSensorAddr && value == 0) {
    var linkedSensor = sensorsMap[linkedSensorAddr];
    clearTimeout(linkedSensor.cooldown);
    linkedSensor.cooldown = _.delay(function() {
      linkedSensor.cooldown = null;
    }, 120*1000);
  }
}

var debounceFuncs = {};
var delayedTurnOff = function(timeout, addr) {
  if (!debounceFuncs[addr]) {
    debounceFuncs[addr] = _.debounce(function () {
      didoKnx.commands.off(addr); //turn off after some time automatically
    }, timeout*1000);
  }  
  return debounceFuncs[addr]();
}

var nightBlindsOn = process.env.NIGHT_BLINDS == 'ON';

var self = {
  start: function (server) {
    //initialization
    setSensors();
    setDaylight();

    //handle websockets so apps automatically update states of switches
    io = socketio.listen(server);
 
    //handle events from KNX system
    didoKnx.connection.on('GroupValue_Write', function (src, dest, value) {
      handleChange(dest, value[0]);
    });

    //handle events triggerred by interaction in app
    didoKnx.connection.on('GroupValue_Write_Manual', function (src, dest, value) {
      handleChange(dest, value);
    });

    //blinds 1 down, light off and arm at 00:55AM
    schedule.scheduleJob({hour: 00, minute: 55}, function() { 
      setDaylight();
      if (nightBlindsOn) {
        didoKnx.commands.down(groupAddresses.scenes["Blinds 1 down"]);
        didoKnx.commands.off(groupAddresses.scenes["Light off"]);
        didoKnx.commands.on(groupAddresses.alarm.Arm);
      }
    });

    //blinds 1 down, light off and arm at 00:55AM
    schedule.scheduleJob({hour: 06, minute: 30}, function() { //blinds 1 up and disarm at 06:30AM
      if (nightBlindsOn) {
        didoKnx.commands.up(groupAddresses.scenes["Blinds 1 up"]);
        didoKnx.commands.on(groupAddresses.alarm.Disarm); //ignored during vacation
      }
    });
  }
};

module.exports = self;