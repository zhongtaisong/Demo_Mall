import _extends from 'babel-runtime/helpers/extends';
import _objectWithoutProperties from 'babel-runtime/helpers/objectWithoutProperties';
import _classCallCheck from 'babel-runtime/helpers/classCallCheck';
import _createClass from 'babel-runtime/helpers/createClass';
import _possibleConstructorReturn from 'babel-runtime/helpers/possibleConstructorReturn';
import _inherits from 'babel-runtime/helpers/inherits';
import React, { Component } from 'react';
import PropTypes from 'prop-types';

var Arrow = function (_Component) {
  _inherits(Arrow, _Component);

  function Arrow() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, Arrow);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = Arrow.__proto__ || Object.getPrototypeOf(Arrow)).call.apply(_ref, [this].concat(args))), _this), _this.onClick = function (e) {
      if (e.stopPropagation) {
        e.stopPropagation();
      }
      _this.props[_this.props.arrowType](e);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Arrow, [{
    key: 'render',
    value: function render() {
      var _props = this.props,
          arrowType = _props.arrowType,
          next = _props.next,
          prev = _props.prev,
          component = _props.component,
          componentProps = _props.componentProps,
          defaultBool = _props.defaultBool,
          prefixCls = _props.prefixCls,
          children = _props.children,
          props = _objectWithoutProperties(_props, ['arrowType', 'next', 'prev', 'component', 'componentProps', 'defaultBool', 'prefixCls', 'children']);

      var className = this.props.className;

      var defaultClass = className + '-default';
      className = (className + ' ' + (prefixCls || '')).trim();
      className = !defaultBool ? className : (className + ' ' + defaultClass).trim();
      className = className + ' ' + arrowType;
      var $props = _extends({}, props, componentProps, {
        className: className,
        onClick: this.onClick
      });
      return React.createElement(component, $props, children);
    }
  }]);

  return Arrow;
}(Component);

Arrow.propTypes = {
  children: PropTypes.any,
  style: PropTypes.object,
  className: PropTypes.string,
  prefixCls: PropTypes.string,
  component: PropTypes.any,
  arrowType: PropTypes.string,
  defaultBool: PropTypes.bool,
  next: PropTypes.func,
  prev: PropTypes.func,
  componentProps: PropTypes.object
};
Arrow.defaultProps = {
  component: 'div',
  className: 'banner-anim-arrow',
  componentProps: {}
};

Arrow.isBannerAnimArrow = true;

export default Arrow;