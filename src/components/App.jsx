import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { GetImages } from '../services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import { Notification } from './Notification/Notification';
import { LoadMoreButton } from './Button/Button';
import { AppContainer } from './App.styled';

export class App extends Component {
  state = {
    query: null,
    cards: [],
    page: 1,
    per_page: 12,
    totalPages: 0,
    isLoading: false,
    error: {
      status: false,
      message: '',
    },
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query || prevState.page !== page) {
      this.handleFetchImages();
    }
  }

  handleFetchImages = async () => {
    const { query, page, per_page } = this.state;
    try {
      this.setState({ isLoading: true });

      const data = await GetImages(query, page, per_page);
      const totalPages = Math.ceil(data.totalHits / per_page);

      this.setState(prevState => {
        return {
          cards: [...prevState.cards, ...data.hits],
          totalPages,
        };
      });
      this.setState(prevState => {
        return prevState.cards.length === 0
          ? {
              error: {
                status: true,
                message: `Sorry, there are no images matching ${query}. Please try again.`,
              },
            }
          : {
              error: {
                status: false,
                message: '',
              },
            };
      });
    } catch (error) {
      this.setState({
        error: {
          status: true,
          message: 'Something went wrong :( Please try again later!',
        },
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  handleSubmit = query => {
    this.setState({ cards: [], query, page: 1 });
  };

  render() {
    const { cards, page, totalPages, isLoading, error } = this.state;
    const isCards = cards.length > 0;
    const showError = error.status && !isLoading;
    const errorMessage = error.message;
    const buttonVisible = isCards && page < totalPages && !isLoading;

    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSubmit} />
        {showError && <Notification message={errorMessage} />}
        {isCards && <ImageGallery cards={cards} />}
        {isLoading && <Loader />}
        {buttonVisible && <LoadMoreButton onClick={this.handleLoadMore} />}
        <GlobalStyle />
      </AppContainer>
    );
  }
}
