var self = {
  data: null,
  find: function (category, name) {
    return _.find(self.data, { Category: category, Name: name }).Address;
  },
  filter: function (category) {
    return _.map(_.filter(self.data, { Category: category }), function (i) { return i.Address; });
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
      groupAddress.Category = category;
      result.push(groupAddress);
    }
  }

  return result;
}

fs.readFile(__dirname + '/data/GroupAddresses.xml', function (err, xml) {
  parser.parseString(xml, function (err, result) {
    var flat = flattenData(result);
    console.log("received group addresses from the file system")
    self.data = flat;
  });
});

module.exports = self;
