import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { GetImages } from '../services/api';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
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
  };

  async componentDidUpdate(_, prevState) {
    const { query, page, per_page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      try {
        this.setState({ isLoading: true });
        const data = await GetImages(query, page, per_page);
        const totalPages = Math.ceil(data.totalHits / per_page);
        this.setState({
          cards: [...prevState.cards, ...data.hits],
          totalPages,
        });
        this.setState({ isLoading: false });
      } catch (error) {
        console.log('componentDidUpdate error', error);
      }
    }
  }

  handleLoadMore = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  handleSubmit = query => {
    this.setState({ cards: [], query, page: 1 });
  };

  render() {
    const { cards, page, totalPages, isLoading } = this.state;
    return (
      <AppContainer>
        <Searchbar onSubmit={this.handleSubmit} />
        {cards.length > 0 && <ImageGallery cards={cards} />}
        {isLoading && <Loader />}
        {page < totalPages && <LoadMoreButton onClick={this.handleLoadMore} />}

        <GlobalStyle />
      </AppContainer>
    );
  }
}
