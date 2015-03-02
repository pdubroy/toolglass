// Copyright (c) 2014 Patrick Dubroy <pdubroy@gmail.com>
// This software is distributed under the terms of the MIT License.

/* jshint browser: true */

var Draggable = require('react-draggable'),
    extend = require('util-extend'),
    React = require('react');

// Misc Helpers
// ------------

function compose() {
  var args = arguments;
  var start = args.length - 1;
  return function() {
    var i = start;
    var result = args[start].apply(this, arguments);
    while (i--) result = args[i].call(this, result);
    return result;
  };
}

var squareFilter = function(shape) {
  return ['rect', shape[1]];
};

var pinkFilter = function(shape) {
  var attrs = extend({}, shape[1]);
  attrs.fill = 'pink';
  return [shape[0], attrs];
};

// SvgCanvas
// ---------

var SvgCanvas = React.createClass({
  displayName: 'SvgCanvas',
  getInitialState: function() {
    return {currentShape: 'circle'};
  },
  render: function() {
    var children = this.props.shapes.map(function(s) {
      return React.createElement.apply(null, s);
    });
    return <svg id='canvas' onClick={this.handleClick}>{children}</svg>;
  },
  handleClick: function(e) {
    this.props.clickHandler(e);
  }
});

// Toolglass
// ---------

var Toolglass = React.createClass({
  getInitialState: function() {
    return {position: {top: 0, left: 0}};
  },
  handleClick: function(e) {
    this.props.clickHandler(e);
    e.stopPropagation();
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
            <div className='toolglass' onClick={this.handleClick}></div>
            <div className='toolglass-handle'>{this.props.description}</div>
          </div>
        </Draggable>
    );
  }
});

// App
// ---

var App = React.createClass({
  displayName: 'App',
  getInitialState: function() {
    return { shapes: [] };
  },
  render: function() {
    return (
      <div id="root">
        <SvgCanvas
            ref='canvas'
            shapes={this.state.shapes}
            clickHandler={this.defaultHandleClick} />
        <Toolglass
            shapes={this.state.shapes}
            clickHandler={compose(this.addShape, squareFilter, this.makeCircleOnClick)}
            description='square' />
        <Toolglass
            shapes={this.state.shapes}
            clickHandler={compose(this.addShape, pinkFilter, this.makeCircleOnClick)}
            description='pink' />
      </div>
    );
  },

  makeShape: function(kind, x, y) {
    var attrs = {
      x: x - 10,
      y: y - 10,
      height: 20,
      width: 20
    };
    if (kind === 'circle') {
      attrs.cx = x;
      attrs.cy = y;
      attrs.r = 10;
    }
    return [kind, attrs];
  },

  makeCircleOnClick: function(e) {
    return this.makeShape('circle', e.pageX, e.pageY);
  },

  addShape: function(shape) {
    this.setState({shapes: this.state.shapes.concat([shape])});
  },

  defaultHandleClick: function(e) {
    this.addShape(this.makeCircleOnClick(e));
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
