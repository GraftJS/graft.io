require('famous/core/famous.css');

// load css
require('./styles');

// Load polyfills
require('famous-polyfills');

// import dependencies
var Engine = require('famous/core/Engine');
var Modifier = require('famous/core/Modifier');
var RenderController = require('famous/views/RenderController');
var Transform = require('famous/core/Transform');
var Transitionable = require('famous/transitions/Transitionable');
var Timer = require('famous/utilities/Timer');
var ImageSurface = require('famous/surfaces/ImageSurface');
var Surface = require('famous/core/Surface');
var Please = require('pleasejs');
var _ = require('lodash');

// create the main context
var mainContext = Engine.createContext();
var transition = new Transitionable(1);

transition.set(0);

var background = new RenderController();


Timer.setInterval(_onInterval, 2000);

var colors = [
  '00ba89',
  '77b0dd',
  '4f7d84',
  '727272'
];

var activeColor = colors[0];

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
  var props = { properties: { backgroundColor: '#' + _getColor() } };
  background.show(new Surface(props), {curve: 'easeInOut', duration: 500 });

  _beat();
  Timer.setTimeout(_beat, 300);
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
  activeColor = _(colors).chain().without(activeColor).sample().value();
  return activeColor;
}
