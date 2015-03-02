// Copyright (c) 2014 Patrick Dubroy <pdubroy@gmail.com>
// This software is distributed under the terms of the MIT License.

/* jshint browser: true */

var Draggable = require('react-draggable'),
    extend = require('util-extend'),
    React = require('react');

// Misc Helpers
// ------------

function rectContains(rect, x, y) {
  return rect.left <= x && x <= rect.right &&
         rect.top <= y && y <= rect.bottom;
}

var squareTransform = function(shape) {
  return ['rect', shape[1]];
};

var pinkTransform = function(shape) {
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
  }
});

// Toolglass
// ---------

var Toolglass = React.createClass({
  getInitialState: function() {
    return {
      position: { top: this.props.top || 0, left: this.props.left || 0 }
    };
  },
  handleClick: function(e) {
    // Swallow clicks on the drag handle.
    if (e.target.classList.contains('toolglass-handle')) {
      e.stopPropagation();
      e.preventDefault();
    }
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
        <Draggable onDrag={this.handleDrag} start={ {x: style.left, y: style.top} }>
          <div style={style} onClick={this.handleClick}>
            <div className='toolglass'></div>
            <div className='toolglass-handle'>{this.props.description}</div>
          </div>
        </Draggable>
    );
  },
  transform: function(shape) {
    return this.props.transform(shape);
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
    var i = 0;
    var makeRef = () => 'child' + i++;

    this.toolglassComponents = [
      <Toolglass
          shapes={this.state.shapes}
          transform={squareTransform}
          description='square'
          ref={makeRef()} />,
      <Toolglass
          shapes={this.state.shapes}
          transform={pinkTransform}
          description='pink'
          ref={makeRef()}
          top={80}
          left={80} />
    ];
    return (
      <div id="root" onClick={this.handleClick}>
        <SvgCanvas shapes={this.state.shapes} />
        {this.toolglassComponents}
      </div>
    );
  },

  handleClick: function(e) {
    var shape = this.makeShape('circle', e.pageX, e.pageY);
    for (var k in this.refs) {
      var component = this.refs[k];
      var rect = component.getDOMNode().getBoundingClientRect();
      if (rectContains(rect, e.clientX, e.clientY)) {
        shape = component.transform(shape);
      }
    }
    this.addShape(shape);
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

  addShape: function(shape) {
    this.setState({shapes: this.state.shapes.concat([shape])});
  }
});

// Main
// ----

React.render(<App/>, document.body);
