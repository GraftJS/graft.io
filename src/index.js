require('famous/core/famous.css');

// load css
require('./styles');

// Load polyfills
require('famous-polyfills');

// Copy the index.html to the output folder
require('file?name=CNAME!../CNAME');


// Copy the index.html to the output folder
require('file?name=index.html!./index.html');

// import dependencies
var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var RenderController = require('famous/views/RenderController');
var EdgeSwapper = require('famous/views/EdgeSwapper');
var Transform = require('famous/core/Transform');
var Transitionable = require('famous/transitions/Transitionable');
var Timer = require('famous/utilities/Timer');
var ImageSurface = require('famous/surfaces/ImageSurface');
var Surface = require('famous/core/Surface');
var Please = require('imports?window=>{}!exports?window.Please!pleasejs');
var _ = require('lodash');

// create the main context
var mainContext = Engine.createContext();
var transition = new Transitionable(1);

transition.set(0);


var colors = [
  '#00ba89',
  '#77b0dd',
  '#4f7d84',
  '#727272'
];

var activeColor = colors[0];

var background = new RenderController({
});


background.show(new Surface({
  properties: {
    backgroundColor: activeColor
  }
})),

Timer.setInterval(_onInterval, 2000);

Timer.setInterval(_background, 5000);


_background();
_onInterval();
mainContext.add(background);

var logo = new ImageSurface({
  size: [undefined, undefined],
  content: require('../static/images/graft_logo.alt.svg'),
  classes: ['backfaceVisibility']
});

var initialTime = Date.now();
var modifier = new Modifier({
  origin: [0, 0.5],
  align: [0.5, 0.5],
  transform: Transform.translate(0, 0, 200)
});

modifier.sizeFrom(function() {
  var newSize = {};
  newSize[0] = 200 + (10 * transition.get());
  newSize[1] = 200 + (10 * transition.get());
  return newSize;
});
mainContext.add(modifier).add(logo);

function _onInterval() {

  _beat();
  Timer.setTimeout(_beat, 300);
}


function _background() {
  var props = { properties: { backgroundColor: _getColor() } };
  background.show(new Surface(props));
}
function _beat() {
  transition.halt();
  transition.set(0);
  transition.set(1, {
    duration: 600,
    curve: 'easeInOut',
    callback: function() {
      transition.set(0);
    }
  });
}

function _getColor() {
  activeColor = Please.make_color();
  return activeColor;
}
