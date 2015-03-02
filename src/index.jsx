// Copyright (c) 2014 Patrick Dubroy <pdubroy@gmail.com>
// This software is distributed under the terms of the MIT License.

/* jshint browser: true */

var Draggable = require('react-draggable'),
    React = require('react');

// Helpers
// -------

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

// SvgCanvas
// ---------

var SvgCanvas = React.createClass({
  displayName: 'SvgCanvas',
  getInitialState: function() {
    return {
      shapes: [],
      currentShape: 'circle'
    };
  },
  render: function() {
    var children = this.state.shapes.map(function(s) {
      return React.createElement.apply(null, s);
    });
    return <svg id='canvas' onClick={this.handleClick}>{children}</svg>;
  },
  handleClick: function(e) {
    var newShape = createShape(this.state.currentShape, e.pageX, e.pageY);
    this.setState({
      shapes: this.state.shapes.concat([newShape])
    });
  }
});

// Toolglass
// ---------

var Toolglass = React.createClass({
  getInitialState: function() {
    return {position: {top: 10, left: 0}};
  },
  handleDrag: function(e, ui) {
    this.setState(ui);
  },
  render: function() {
    var style = {
      left: this.state.position.left,
      position: 'absolute',
      top: this.state.position.top
    };
    return (
        <Draggable onDrag={this.handleDrag}>
          <div style={style}>
            <div className='toolglass'></div>
            <div className='toolglass-handle'></div>
          </div>
        </Draggable>
    );
  }
});

// App
// ---

var App = React.createClass({
  displayName: 'App',
  render: function() {
    return <div id="root"><SvgCanvas ref='canvas' /><Toolglass/></div>;
  }
});

// Main
// ----

(function main() {
  var app = React.render(<App/>, document.body);

  window.addEventListener('keypress', function(e) {
    var key = String.fromCharCode(e.keyCode);
      if (key === 'r') {
        app.refs.canvas.setState({ currentShape: 'rect' });
      } else if (key === 'c') {
        app.refs.canvas.setState({ currentShape: 'circle' });
      }
  });
})();
