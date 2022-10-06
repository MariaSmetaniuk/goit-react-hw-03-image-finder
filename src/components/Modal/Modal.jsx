import { Component } from 'react';
import PropTypes from 'prop-types';
import { Overlay, ModalContent } from './Modal.styled';

export class Modal extends Component {
  componentDidMount() {
    console.log('ModalMount');
  }

  render() {
    const { largeImageURL } = this.props;
    return (
      <Overlay>
        <ModalContent>
          <img src={largeImageURL} alt="" />
        </ModalContent>
      </Overlay>
    );
  }
}

Modal.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
};
