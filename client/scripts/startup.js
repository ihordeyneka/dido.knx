import LightRouter from "lightrouter"
import HashChange from "hashchange"
import Home from "./pages/home"
import Light from "./pages/light"
import Blinds from "./pages/blinds"

var router = new LightRouter({
  type: 'hash',
  handler: {
    home: function () { Home.render(); },
    light: function () { Light.render(); },
    blinds: function (params) { Blinds.render(); }
  },
  pathRoot: 'my-app/path',
  routes: {
    '': 'home',
    'light': 'light',
    'blinds': 'blinds'
  }
});

router.run();

HashChange.update(function () {
  router.run();
});