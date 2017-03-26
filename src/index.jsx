/**
 * Created by thram on 30/01/17.
 */
import _assign from 'lodash/assign';
import _omit from 'lodash/omit';
import _find from 'lodash/find';
import { parse, stringify } from 'qs';
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-thrux';
import { register, createDict, dispatch } from 'thrux';

let routes;
let options = {
  base: '#',
};

register({
  router: {
    GO_ROUTE: createDict(({ route, props }) => _assign({}, route, { props })),
    SET_TAB: createDict((tab, state) => _assign({}, state, { tab })),
    OPEN_MODAL: createDict((modal, state) => _assign({}, state, { modal })),
    CLOSE_MODAL: createDict((payload, state) => _omit(state, 'modal')),
  },
});

export const setTab = tab => dispatch('router:SET_TAB', tab);

export const goRoute = (routeId, query) => {
  window.location.href = `${options.base}${routeId || '/'}${query ? `?${stringify(query)}` : ''}`;
};

export const openModal = ({ component }) => dispatch('router:OPEN_MODAL', { component });

export const closeModal = () => dispatch('router:CLOSE_MODAL');

const goHash = () => {
  const [path, query] = location.hash.split('?');
  const routeId = path.replace(`${options.base}`, '');
  dispatch('router:GO_ROUTE', {
    route: _find(routes, { path: routeId || '/' }),
    props: parse(query),
  });
};

class Router extends Component {

  propTypes = {
    routes: PropTypes.arrayOf(PropTypes.shape({})),
    loading: PropTypes.string,
    options: PropTypes.arrayOf(PropTypes.shape({})),
    router: PropTypes.arrayOf(PropTypes.shape({ component: {}, props: {} })),
  };

  constructor(props) {
    super(props);
    routes = props.routes;
    options = _assign({}, options, props.options);
  }

  componentDidMount = () => {
    window.onhashchange = () => goHash();
    goHash();
  };

  renderLoading = () => (<div
    ref={(loading) => {
      this.loading = loading;
    }}
  >{this.props.loading || 'Loading'}</div>);

  renderComponent = () => {
    const ReactComponent = this.props.router.component;
    return (<ReactComponent
      ref={(component) => {
        this.scene = component;
      }} {...this.props.router.props}
    />);
  };

  render = () => (this.props.router
    ? this.renderComponent()
    : this.renderLoading());
}

export default connect('router', Router);
