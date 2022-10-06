import { Component } from 'react';
import PropTypes from 'prop-types';
import { Gallery } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

export class ImageGallery extends Component {
  render() {
    const { cards } = this.props;
    return (
      <Gallery>
        {cards.map(({ id, ...otherProps }) => (
          <ImageGalleryItem key={id} {...otherProps} />
        ))}
      </Gallery>
    );
  }
}

ImageGallery.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ),
};
