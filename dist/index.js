'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.closeModal = exports.openModal = exports.goRoute = exports.setTab = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }(); /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          * Created by thram on 30/01/17.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          */


var _assign = require('lodash/assign');

var _assign2 = _interopRequireDefault(_assign);

var _omit = require('lodash/omit');

var _omit2 = _interopRequireDefault(_omit);

var _find = require('lodash/find');

var _find2 = _interopRequireDefault(_find);

var _qs = require('qs');

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactThrux = require('react-thrux');

var _thrux = require('thrux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _routes = void 0,
    _options = {
  base: '#'
};

(0, _thrux.register)({
  router: {
    GO_ROUTE: (0, _thrux.createDict)(function (_ref, state) {
      var route = _ref.route,
          props = _ref.props;
      return (0, _assign2.default)({}, route, { props: props });
    }),
    SET_TAB: (0, _thrux.createDict)(function (tab, state) {
      return (0, _assign2.default)({}, state, { tab: tab });
    }),
    OPEN_MODAL: (0, _thrux.createDict)(function (modal, state) {
      return (0, _assign2.default)({}, state, { modal: modal });
    }),
    CLOSE_MODAL: (0, _thrux.createDict)(function (payload, state) {
      return (0, _omit2.default)(state, 'modal');
    })
  }
});

var setTab = exports.setTab = function setTab(tab) {
  return (0, _thrux.dispatch)('router:SET_TAB', tab);
};

var goRoute = exports.goRoute = function goRoute(routeId, query) {
  return window.location.href = '' + _options.base + (routeId || '/') + (query ? '?' + (0, _qs.stringify)(query) : '');
};

var openModal = exports.openModal = function openModal(_ref2) {
  var component = _ref2.component;
  return (0, _thrux.dispatch)('router:OPEN_MODAL', { component: component });
};

var closeModal = exports.closeModal = function closeModal() {
  return (0, _thrux.dispatch)('router:CLOSE_MODAL');
};

var goHash = function goHash() {
  var _location$hash$split = location.hash.split('?'),
      _location$hash$split2 = _slicedToArray(_location$hash$split, 2),
      path = _location$hash$split2[0],
      query = _location$hash$split2[1];

  var routeId = path.replace('' + _options.base, '');
  (0, _thrux.dispatch)('router:GO_ROUTE', {
    route: (0, _find2.default)(_routes, { path: routeId || '/' }),
    props: (0, _qs.parse)(query)
  });
};

var Router = function (_Component) {
  _inherits(Router, _Component);

  function Router(props) {
    _classCallCheck(this, Router);

    var _this = _possibleConstructorReturn(this, (Router.__proto__ || Object.getPrototypeOf(Router)).call(this, props));

    _this.componentDidMount = function () {
      window.onhashchange = function () {
        return goHash();
      };
      goHash();
    };

    _this.render = function () {
      if (_this.state) {
        var ReactComponent = _this.state.router.component;
        return _react2.default.createElement(ReactComponent, _this.state.router.props);
      } else {
        return _react2.default.createElement(
          'div',
          null,
          _this.props.loading || 'Loading'
        );
      }
    };

    _routes = props.routes;
    _options = (0, _assign2.default)({}, _options, props.options);
    return _this;
  }

  return Router;
}(_react.Component);

exports.default = (0, _reactThrux.connect)('router', Router);