!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var o;"undefined"!=typeof window?o=window:"undefined"!=typeof global?o=global:"undefined"!=typeof self&&(o=self),o.toolglass=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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

},{}]},{},[1])(1)
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZHVicm95L2Rldi90b29sZ2xhc3MvaW5kZXguanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTQgUGF0cmljayBEdWJyb3kgPHBkdWJyb3lAZ21haWwuY29tPlxuLy8gVGhpcyBzb2Z0d2FyZSBpcyBkaXN0cmlidXRlZCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIE1JVCBMaWNlbnNlLlxuXG4vKiBqc2hpbnQgYnJvd3NlcjogdHJ1ZSAqL1xuLyogZ2xvYmFsIFJlYWN0ICovXG5cbnZhciBzdmcgPSBSZWFjdC5ET00uc3ZnO1xuXG5mdW5jdGlvbiBjcmVhdGVTaGFwZShzaGFwZSwgeCwgeSkge1xuICB2YXIgYXR0cnM7XG4gIGlmIChzaGFwZSA9PT0gJ2NpcmNsZScpIHtcbiAgICBhdHRycyA9IHtcbiAgICAgIGN4OiB4LFxuICAgICAgY3k6IHksXG4gICAgICByOiAxMFxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgYXR0cnMgPSB7XG4gICAgICB4OiB4IC0gMTAsXG4gICAgICB5OiB5IC0gMTAsXG4gICAgICBoZWlnaHQ6IDIwLFxuICAgICAgd2lkdGg6IDIwXG4gICAgfTtcbiAgfVxuICByZXR1cm4gW3NoYXBlLCBhdHRyc107XG59XG5cbnZhciBTdmdDYW52YXMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGRpc3BsYXlOYW1lOiAnU3ZnQ2FudmFzJyxcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgc2hhcGVzOiBbXSxcbiAgICAgIGN1cnJlbnRTaGFwZTogJ2NpcmNsZSdcbiAgICB9O1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBhdHRycyA9IHtcbiAgICAgIGlkOiAnY2FudmFzJyxcbiAgICAgIG9uQ2xpY2s6IHRoaXMuaGFuZGxlQ2xpY2tcbiAgICB9O1xuICAgIHZhciBhcmdzID0gW2F0dHJzXS5jb25jYXQodGhpcy5zdGF0ZS5zaGFwZXMubWFwKGZ1bmN0aW9uKHMpIHtcbiAgICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50LmFwcGx5KG51bGwsIHMpO1xuICAgIH0pKTtcbiAgICByZXR1cm4gc3ZnLmFwcGx5KG51bGwsIGFyZ3MpO1xuICB9LFxuICBoYW5kbGVDbGljazogZnVuY3Rpb24oZSkge1xuICAgIHZhciBuZXdTaGFwZSA9IGNyZWF0ZVNoYXBlKHRoaXMuc3RhdGUuY3VycmVudFNoYXBlLCBlLnBhZ2VYLCBlLnBhZ2VZKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHNoYXBlczogdGhpcy5zdGF0ZS5zaGFwZXMuY29uY2F0KFtuZXdTaGFwZV0pXG4gICAgfSk7XG4gIH1cbn0pO1xuXG52YXIgY2FudmFzID0gUmVhY3QucmVuZGVyKFJlYWN0LmNyZWF0ZUVsZW1lbnQoU3ZnQ2FudmFzLCB7fSksIGRvY3VtZW50LmJvZHkpO1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5cHJlc3MnLCBmdW5jdGlvbihlKSB7XG4gIHZhciBrZXkgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGUua2V5Q29kZSk7XG4gICAgaWYgKGtleSA9PT0gJ3InKSB7XG4gICAgICBjYW52YXMuc2V0U3RhdGUoeyBjdXJyZW50U2hhcGU6ICdyZWN0JyB9KTtcbiAgICB9IGVsc2UgaWYgKGtleSA9PT0gJ2MnKSB7XG4gICAgICBjYW52YXMuc2V0U3RhdGUoeyBjdXJyZW50U2hhcGU6ICdjaXJjbGUnIH0pO1xuICAgIH1cbn0pO1xuIl19
