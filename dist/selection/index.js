'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cond = require('ramda/src/cond');

var _cond2 = _interopRequireDefault(_cond);

var _has = require('ramda/src/has');

var _has2 = _interopRequireDefault(_has);

var _filters = require('../filters');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var instanceProps = ['html', 'text', 'datum', 'data', 'call', 'remove'];

var appendNode = function appendNode(id, _ref, asD3, selections) {
  var _ref$node = _ref.node,
      _ref$node$attrs = _ref$node.attrs,
      attrs = _ref$node$attrs === undefined ? {} : _ref$node$attrs,
      _ref$node$styles = _ref$node.styles,
      styles = _ref$node$styles === undefined ? {} : _ref$node$styles,
      tagName = _ref$node.tagName,
      options = _objectWithoutProperties(_ref$node, ['attrs', 'styles', 'tagName']);

  var node = asD3.append(tagName);

  selections[id] = node;

  instanceProps.forEach(function (prop) {
    return options[prop] && node[prop] && node[prop](options[prop]);
  });

  Object.keys(attrs).forEach(function (attr) {
    return node.attr(attr, attrs[attr]);
  });
  Object.keys(styles).forEach(function (style) {
    return node.style(style, styles[style]);
  });

  return node;
};

var appendNodes = function appendNodes(id, _ref2, asD3, selections) {
  var nodes = _ref2.nodes,
      node = _ref2.node,
      _ref2$selector = _ref2.selector,
      selector = _ref2$selector === undefined ? null : _ref2$selector;

  var wrapper = selector ? asD3.select(selector) : asD3;

  if (nodes && nodes.length) {
    return nodes.map(function (n, k) {
      return appendNode(id + '-k', { node: n }, wrapper, selections);
    });
  }

  return appendNode(id, { node: node }, wrapper, selections);
};

var updateNode = function updateNode(id, _ref3, asD3, selections) {
  var _ref3$node = _ref3.node,
      _ref3$node$attrs = _ref3$node.attrs,
      attrs = _ref3$node$attrs === undefined ? {} : _ref3$node$attrs,
      _ref3$node$styles = _ref3$node.styles,
      styles = _ref3$node$styles === undefined ? {} : _ref3$node$styles,
      options = _objectWithoutProperties(_ref3$node, ['attrs', 'styles']);

  var selection = selections[id];

  instanceProps.forEach(function (prop) {
    return options[prop] && selection[prop] && selection[prop](options[prop]);
  });

  if (options.remove) {
    delete selections[id];
    return selection;
  }

  Object.keys(attrs).forEach(function (attr) {
    return selection.attr(attr, attrs[attr]);
  });
  Object.keys(styles).forEach(function (style) {
    return selection.style(style, styles[style]);
  });

  return selection;
};

exports.default = (0, _cond2.default)([[function (id, ev, asD3, selections) {
  return (0, _has2.default)(id, selections);
}, updateNode], [function (id, ev, asD3, selections) {
  return !(0, _has2.default)(id, selections);
}, appendNodes]]);