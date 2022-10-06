import { Component } from 'react';
import PropTypes from 'prop-types';
import { Item, ItemImg } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  toggleModal = () => {
    this.setState(prevState => {
      return { isModalOpen: !prevState.isModalOpen };
    });
  };

  render() {
    const { webformatURL, largeImageURL } = this.props;
    return (
      <Item>
        <ItemImg src={webformatURL} alt="" onClick={this.toggleModal} />
        {this.state.isModalOpen && <Modal largeImageURL={largeImageURL} />}
      </Item>
    );
  }
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
