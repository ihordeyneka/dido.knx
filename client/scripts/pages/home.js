import HtmlContent from '../../html/home.html';

var self = {};

self.render = function () {
  document.body.innerHTML = HtmlContent;
  gtag('config', 'UA-128283819-2', {'page_path': '/'});
};

export default self;