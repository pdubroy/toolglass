// Copyright (c) 2014 Patrick Dubroy <pdubroy@gmail.com>
// This software is distributed under the terms of the MIT License.

/* jshint browser: true */
/* global React */

var svg = React.DOM.svg;

function createShape(shape, x, y) {
  var attrs;
  if (shape === 'circle') {
    attrs = {
      cx: x,
      cy: y,
      r: 10
    };
  } else {
    attrs = {
      x: x - 10,
      y: y - 10,
      height: 20,
      width: 20
    };
  }
  return [shape, attrs];
}

var SvgCanvas = React.createClass({
  displayName: 'SvgCanvas',
  getInitialState: function() {
    return {
      shapes: [],
      currentShape: 'circle'
    };
  },
  render: function() {
    var attrs = {
      id: 'canvas',
      onClick: this.handleClick
    };
    var args = [attrs].concat(this.state.shapes.map(function(s) {
      return React.createElement.apply(null, s);
    }));
    return svg.apply(null, args);
  },
  handleClick: function(e) {
    var newShape = createShape(this.state.currentShape, e.pageX, e.pageY);
    this.setState({
      shapes: this.state.shapes.concat([newShape])
    });
  }
});

var canvas = React.render(React.createElement(SvgCanvas, {}), document.body);

window.addEventListener('keypress', function(e) {
  var key = String.fromCharCode(e.keyCode);
    if (key === 'r') {
      canvas.setState({ currentShape: 'rect' });
    } else if (key === 'c') {
      canvas.setState({ currentShape: 'circle' });
    }
});
