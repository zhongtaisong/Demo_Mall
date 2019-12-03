import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { toArrayChildren } from './utils';

var Thumb = function (_Component) {
  _inherits(Thumb, _Component);

  function Thumb() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Thumb);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Thumb.__proto__ || Object.getPrototypeOf(Thumb)).call.apply(_ref, [this].concat(args))), _this), _this.getDefaultThumb = function () {
      var children = [];
      for (var i = 0; i < _this.props.length; i++) {
        children.push(React.createElement('span', { key: i }));
      }
      return children;
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Thumb, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          length = _props.length,
          thumbClick = _props.thumbClick,
          active = _props.active,
          defaultBool = _props.defaultBool,
          component = _props.component,
          componentProps = _props.componentProps,
          prefixCls = _props.prefixCls,
          propsChildren = _props.children,
          props = _objectWithoutProperties(_props, ['length', 'thumbClick', 'active', 'defaultBool', 'component', 'componentProps', 'prefixCls', 'children']);

      var className = 'banner-anim-thumb';
      var defaultClass = className + '-default';
      className = (className + ' ' + (prefixCls || '')).trim();
      className = !defaultBool ? className : (className + ' ' + defaultClass).trim();
      var children = defaultBool ? this.getDefaultThumb() : propsChildren;
      if (length && toArrayChildren(children).length !== length) {
        console.warn('The thumbnail length and the images length different.'); // eslint-disable-line
      }
      var childToRender = toArrayChildren(children).map(function (item, i) {
        var itemProps = _extends({}, item.props);
        itemProps.onClick = function (e) {
          if (e.stopPropagation) {
            e.stopPropagation();
          }
          thumbClick(i);
        };
        itemProps.className = ((itemProps.className || '') + ' ' + (active === i ? 'active' : '')).trim();
        return React.cloneElement(item, itemProps);
      });
      var $props = _extends({}, props, componentProps, { className: className });

      return React.createElement(component, $props, childToRender);
    }
  }]);

  return Thumb;
}(Component);

Thumb.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  prefixCls: PropTypes.string,
  component: PropTypes.any,
  thumbClick: PropTypes.func,
  defaultBool: PropTypes.bool,
  length: PropTypes.number,
  active: PropTypes.number,
  componentProps: PropTypes.object
};
Thumb.defaultProps = {
  component: 'div',
  componentProps: {},
  thumbClick: function thumbClick() {}
};
Thumb.isBannerAnimThumb = true;

export default Thumb;