import HtmlContent from '../../html/scenes.html';
import _ from 'lodash'
import ajax from 'ajax-request'

var self = {};

self.render = function () {
  document.body.innerHTML = HtmlContent;
  gtag('config', 'UA-128283819-2', {'page_path': '/#scenes'});
  ajax({
    url: "/api/scenes",
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

  var templateElement = document.getElementById("tmplScene");
  var template = _.template(templateElement.innerHTML);

  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    content += template(item);
  }

  var scenesElement = document.getElementById("scenes");
  scenesElement.innerHTML = content;

  var buttons = document.getElementsByTagName("button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = buttonClick;
  }
}

var buttonClick = function () {
  var labelElement = this.parentElement;
  var name = labelElement.getAttribute("data-name");
  var command = labelElement.getAttribute("data-command");
  gtag('event', 'scenes/' + command, { 'event_category' : 'scenes', 'event_label' : name });
  ajax({
    method: "POST",
    url: "/api/scenes/" + command + "/" + name
  }, function (err) {
    if (err) {
      alert("Unexpected error...");
      window.location = "/";
    }
  });
};

export default self;