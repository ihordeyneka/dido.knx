import LightRouter from "lightrouter"
import HashChange from "hashchange"
import SimpleGridScss from "simplegrid/simple-grid.scss"
import ToggleSwitchScss from "css-toggle-switch/src/toggle-switch.scss"
import SwitchThemeScss from "../scss/switch.scss"
import MainScss from "../scss/main.scss"
import Home from "./pages/home"
import Light from "./pages/light"
import Blinds from "./pages/blinds"
import Vents from "./pages/vents"
import Scenes from "./pages/scenes"
import io from "socket.io-client"

var socket = io();

socket.on('knx_write', function (data) {
  var input = document.getElementById(data.Address);
  if (input)
    input.checked = data.State ? true : false
});

var router = new LightRouter({
  type: 'hash',
  handler: {
    home: function () { Home.render(); },
    light: function () { Light.render(); },
    blinds: function (params) { Blinds.render(); },
    vents: function (params) { Vents.render(); },
    scenes: function (params) { Scenes.render(); }
  },
  routes: {
    '': 'home',
    'light': 'light',
    'blinds': 'blinds',
    'vents': 'vents',
    'scenes': 'scenes'
  }
});

router.run();

HashChange.update(function () {
  router.run();
});