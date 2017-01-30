/**
 * Created by thram on 30/01/17.
 */
import assign from 'lodash/assign';
import omit from 'lodash/omit';
import find from 'lodash/find';
import {parse, stringify} from 'qs';
import React, {Component} from "react";
import {connect} from "react-thrux";
import {register, createDict, dispatch} from "thrux";

let _routes,
    _options = {
      base: '#'
    };

register({
  router: {
    GO_ROUTE   : createDict(({route, props}, state) => assign({}, route, {props})),
    SET_TAB    : createDict((tab, state) => assign({}, state, {tab})),
    OPEN_MODAL : createDict((modal, state) => assign({}, state, {modal})),
    CLOSE_MODAL: createDict((payload, state) => omit(state, 'modal'))
  }
});

export const setTab = (tab) => dispatch('router:SET_TAB', tab);

export const goRoute = (routeId, query) => window.location.href = `${_options.base}${routeId || '/'}${query ? `?${stringify(query)}` : ''}`;

export const openModal = ({component}) => dispatch('router:OPEN_MODAL', {component});

export const closeModal = () => dispatch('router:CLOSE_MODAL');

const goHash = () => {
  const [path, query] =location.hash.split('?');
  const routeId       = path.replace(`${_options.base}`, '');
  dispatch('router:GO_ROUTE', {
    route: find(_routes, {path: routeId || '/'}),
    props: parse(query)
  });
};

class Router extends Component {

  constructor(props) {
    super(props);
    _routes  = props.routes;
    _options = assign({}, _options, props.options);
  }

  componentDidMount = () => {
    window.onhashchange = () => goHash();
    goHash();
  };

  render = () => {
    if (this.state) {
      const ReactComponent = this.state.router.component;
      return ( <ReactComponent {...this.state.router.props} /> );
    } else {
      return ( <div>{this.props.loading || 'Loading'}</div> );
    }
  }
}

export default connect('router', Router);