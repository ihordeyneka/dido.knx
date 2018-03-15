import HtmlContent from '../../html/blinds.html';

import _ from 'lodash'
import ajax from 'ajax-request'

var self = {};

self.render = function () {
  document.body.innerHTML = HtmlContent;
  ajax({
    url: "/api/blinds",
    json: true
  }, function (err, res, data) {
    if (err) {
      alert("Unexpected error...");
      window.location = "/";
    } else {
      populate(data);
    }

  });
};

var populate = function (data) {
  var content = "";

  var templateElement = document.getElementById("tmplBlind");
  var template = _.template(templateElement.innerHTML);

  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    content += template(item);
  }

  var switchesElement = document.getElementById("blinds");
  switchesElement.innerHTML = content;

  var inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchChange;
  }
}

var switchChange = function () {
  var command = this.checked ? "down" : "up";
  var labelElement = this.parentElement;
  var name = labelElement.getAttribute("data-name");
  ajax({
    method: "POST",
    url: "/api/blinds/" + command + "/" + name
  }, function (err) {
    if (err) {
      alert("Unexpected error...");
      window.location = "/";
    }
  });
};

export default self;