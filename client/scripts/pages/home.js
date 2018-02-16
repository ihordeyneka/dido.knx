import HtmlContent from '../../html/home.html';

var self = {};

self.render = function () {
  document.body.innerHTML = HtmlContent;
};

export default self;