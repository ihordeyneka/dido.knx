import HtmlContent from '../../html/vents.html';
import _ from 'lodash'
import ajax from 'ajax-request'

var self = {};

self.render = function () {
  document.body.innerHTML = HtmlContent;
  gtag('config', 'UA-128283819-2', {'page_path': '/#vents'});
  ajax({
    url: "/api/vents",
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

  var templateElement = document.getElementById("tmplVent");
  var template = _.template(templateElement.innerHTML);

  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    content += template(item);
  }

  var ventsElement = document.getElementById("vents");
  ventsElement.innerHTML = content;

  getCurrentState(data);

  var inputs = document.getElementsByTagName("input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchChange;
  }
}

var getCurrentState = function (data) {
  var callback = function(address) {
    return function (err, res, body) {
      if (!err) {
        var input = document.getElementById(address);
        var labelElement = input.parentElement;
        input.checked = body.state != 0;
        labelElement.classList.remove("switch-loading");
      }
    };
  };
  for (var i = 0; i < data.length; i++) {
    ajax({
      url: "/api/vents/" + data[i].Name,
      json: true
    }, callback(data[i].Address));
  }
};

var switchChange = function () {
  var command = this.checked ? "on" : "off";
  var labelElement = this.parentElement;
  var name = labelElement.getAttribute("data-name");
  gtag('event', 'vents/' + command, { 'event_category' : 'vents', 'event_label' : name });
  ajax({
    method: "POST",
    url: "/api/vents/" + command + "/" + name
  }, function (err) {
    if (err) {
      alert("Unexpected error...");
      window.location = "/";
    }
  });
};

export default self;