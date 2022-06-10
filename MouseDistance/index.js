var AREA = 100;
var DOT_SIZE = 5;
var DOTS_GAP = 10;
var svgNamespace = 'http://www.w3.org/2000/svg';

const container = document.getElementById('dotsContainer');
const dots = new Dots(39, 39, AREA);
dots.render(container);
