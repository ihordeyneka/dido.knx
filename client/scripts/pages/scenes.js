import HtmlContent from '../../html/scenes.html';
import _ from 'lodash'
import ajax from 'ajax-request'

var self = {};

self.render = function () {
  document.body.innerHTML = HtmlContent;

  var scenesElement = document.getElementById("scenes");
  scenesElement.innerHTML = "No scenes have been added yet.";
};

export default self;