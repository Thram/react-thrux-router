/**
 * Created by thram on 30/01/17.
 */
import _omit from 'lodash/omit';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-thrux';
import { goHash, goRoute as actionGoRoute, initRoutes } from './actions';
import { error, fullScreen } from './styles';
import Modal from './Modal';

export const goRoute = actionGoRoute;


class Router extends Component {

  static propTypes = {
    routes: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({})),
      PropTypes.shape({}),
    ]),
    loading: PropTypes.string,
    error: PropTypes.string,
    options: PropTypes.shape({}),
    router: PropTypes.shape({
      modal: PropTypes.shape({}),
      current: PropTypes.shape({
        component: PropTypes.func,
        props: PropTypes.shape({}),
      }),
    }),
  };

  static defaultProps = {
    routes: [],
    loading: 'Loading',
    error: 'Error',
    options: undefined,
    router: undefined,
  };

  constructor(props) {
    super(props);
    initRoutes(props.routes, props.options);
  }

  componentDidMount = () => {
    window.onhashchange = () => goHash();
    setTimeout(goHash, 0);
  };

  setScene = (component) => {
    this.scene = component;
  };

  setLoading = (div) => {
    this.loading = div;
  };

  setError = (div) => {
    this.error = div;
  };

  renderLoading = () => (
    <div ref={this.setLoading} style={fullScreen}>{this.props.loading || 'Loading'}</div>);

  renderError = () => (
    <div ref={this.setError} style={error}>{this.props.error || 'Error!'}</div>);

  renderComponent = () => {
    const { component: ReactComponent, props } = this.props.router.current;
    const { modal } = this.props.router;
    return ReactComponent ? (
      <div {..._omit(this.props, ['routes', 'loading', 'options', 'router'])}>
        <ReactComponent ref={this.setScene} {...props} />
        {modal && <Modal {...modal} />}
      </div>
    ) : this.renderError();
  };

  render = () => (this.props.router
    ? this.renderComponent()
    : this.renderLoading());
}

export default connect('router', Router);
