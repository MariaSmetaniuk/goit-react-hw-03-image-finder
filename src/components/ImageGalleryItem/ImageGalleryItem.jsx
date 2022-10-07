import { Component } from 'react';
import PropTypes from 'prop-types';
import { Item, ItemImg } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  openModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeModal = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { webformatURL, largeImageURL } = this.props;
    return (
      <Item>
        <ItemImg src={webformatURL} alt="" onClick={this.openModal} />
        {this.state.isModalOpen && (
          <Modal largeImageURL={largeImageURL} closeModal={this.closeModal} />
        )}
      </Item>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
