import HtmlContent from '../../html/scenes.html';
import _ from 'lodash';
import ajax from 'ajax-request';
import PureModal from 'pure-modal';

var self = {
  code: null
};

self.render = function () {
  document.body.innerHTML = HtmlContent;
  gtag('config', 'UA-128283819-2', {'page_path': '/#scenes'});
  fetchData("/api/scenes", "scenes", "scenes");
  fetchData("/api/alarm", "alarm", "alarm");

  self.authorizeModal = new PureModal('authorizeModal');
  self.authorizeModal.init();

  var buttonAuth = document.getElementById("button-auth");
  buttonAuth.onclick = authorizeClick;
};

var fetchData = function(url, category, containerId) {
  ajax({
    url: url,
    json: true
  }, function (err, res, data) {
    if (err) {
      alert("Unexpected error...");
      window.location = "/";
    } else {
      populate(data, category, containerId);
    }
  });
}

var populate = function (data, category, containerId) {
  var content = "";

  var templateElement = document.getElementById("tmplScene");
  var template = _.template(templateElement.innerHTML);

  for (var i = 0; i < data.length; i++) {
    var item = data[i];
    item.Category = category;
    content += template(item);
  }

  var scenesElement = document.getElementById(containerId);
  scenesElement.innerHTML = content;

  var buttons = document.getElementsByClassName("apply-button");
  for (var i = 0; i < buttons.length; i++) {
    buttons[i].onclick = buttonClick;
  }
}

var buttonClick = function () {
  var labelElement = this.parentElement;
  var category = labelElement.getAttribute("data-category");
  var name = labelElement.getAttribute("data-name");
  var command = labelElement.getAttribute("data-command");
  gtag('event', 'scenes/' + command, { 'event_category' : 'scenes', 'event_label' : name });
  ajax({
    method: "POST",
    url: "/api/" + category + "/" + command + "/" + name,
    data: {
      code: self.code
    }
  }, function (err, res) {
    if (err) {
      alert("Unexpected error...");
      window.location = "/";
    } else if (res.statusCode == 403) {
      alert("Alarm control is not authorized");
    }
  });
};

var authorizeClick = function(e) {
  ajax({
    url: "/api/sms",
    json: true
  }, function (err, res, data) {
    if (err) {
      alert("Unexpected error...");
      window.location = "/";
    } else {
      self.authorizeModal.open(e);
    }
  });
};

window.codeClick = function(e) {
  self.code = document.getElementById('inputCode').value;
  self.authorizeModal.close();
};

export default self;