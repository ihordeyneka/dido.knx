import HtmlContent from '../../html/blinds.html';

var self = {};

self.render = function () {
  document.body.innerHTML = HtmlContent;
};

export default self;