import HtmlContent from '../../html/blinds.html';

import _ from 'lodash'
import ajax from 'ajax-request'

var self = {};

self.render = function () {
  document.body.innerHTML = HtmlContent;
  gtag('config', 'UA-128283819-2', {'page_path': '/#blinds'});
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

  getCurrentState(data);

  var inputs = document.getElementsByClassName("switch-input");
  for (var i = 0; i < inputs.length; i++) {
    inputs[i].onclick = switchChange;
  }
}

var getCurrentState = function (data) {
  var callback = function(address) {
    return function (err, res, body) {
      if (!err) {
        var addrDiv = document.getElementById(address);
        var switchContainer = addrDiv.parentElement;
        var upInput = document.getElementById(`up-${address}`)
        upInput.checked = body.state == 0;
        var downInput = document.getElementById(`down-${address}`)
        downInput.checked = body.state != 0;
        switchContainer.classList.remove("switch-loading");
      }
    };
  };
  for (var i = 0; i < data.length; i++) {
    ajax({
      url: "/api/blinds/" + data[i].Name,
      json: true
    }, callback(data[i].Address));
  }
};

var switchChange = function () {
  var command = this.getAttribute("data-command");
  var addrDiv = this.parentElement;
  var name = addrDiv.getAttribute("data-name");
  gtag('event', 'blinds/' + command, { 'event_category' : 'blinds', 'event_label' : name });
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