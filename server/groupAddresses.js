var naming = {
  suffixes: {
    move: " move", //blinds move
    stop: " stop" //blinds stop
  }
}

var self = {
  data: null,
  findAddress: function (category, name) {
    return _.find(self.data, { Category: category, Name: name }).Address;
  },
  filter: function (category) {
    return _.filter(self.data, { Category: category });
  }
};

var fs = require('fs');
var xml2js = require('xml2js');
var _ = require("lodash");

var parser = new xml2js.Parser();

var flattenData = function (data) {
  var result = [];

  var categories = data["GroupAddress-Export"]["GroupRange"][0]["GroupRange"];

  for (var i = 0; i < categories.length; i++) {
    var category = categories[i].$.Name;
    var addresses = categories[i]["GroupAddress"];

    if (!addresses)
      continue;

    for (var j = 0; j < addresses.length; j++) {
      var groupAddress = addresses[j].$;
      var parsed = parseGroupAddress(groupAddress, category);

      if (parsed)
        result.push(parsed);
    }
  }

  return result;
}

var parseGroupAddress = function (groupAddress, category) {
  if (groupAddress.Name.endsWith(naming.suffixes.stop))
    return null;

  if (groupAddress.Name.endsWith(naming.suffixes.move))
    groupAddress.Name = groupAddress.Name.replace(naming.suffixes.move, '');

  groupAddress.Category = category;

  return groupAddress;
}

fs.readFile(__dirname + '/data/GroupAddresses.xml', function (err, xml) {
  parser.parseString(xml, function (err, result) {
    var flat = flattenData(result);
    self.data = flat;
    console.log("received group addresses from the file system")
  });
});

module.exports = self;
