import React, { Component } from 'react';
import s from './Modal.module.css';

class ModalWindow extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    event.code === 'Escape' && this.props.closeModal();
  };

  handleOverlayClick = event => {
    event.currentTarget === event.target && this.props.closeModal();

    console.log(event.currentTarget === event.target);
  };

  render() {
    const { src, alt } = this.props;
    return (
      <div className={s.overlay} onClick={this.handleOverlayClick}>
        <div className={s.modal}>
          <img className={s.img} src={src} alt={alt} />
        </div>
      </div>
    );
  }
}

export default ModalWindow;
