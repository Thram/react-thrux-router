import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { modalOverlay } from './styles';

class Modal extends Component {

  static propTypes = {
    component: PropTypes.func,
    props: PropTypes.shape({}),
  };

  static defaultProps = {
    component: undefined,
    props: undefined,
  };

  setModal = (component) => {
    this.modal = component;
  };

  render = () => {
    const { component: ReactComponent, props } = this.props;
    return ReactComponent && (
    <div style={modalOverlay}>
      <ReactComponent ref={this.setModal} {...props} />
    </div>);
  };
}

export default Modal;
