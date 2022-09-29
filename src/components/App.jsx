import { GlobalStyle } from './GlobalStyle';
import { Searchbar } from './Searchbar/Searchbar';
import { AppContainer } from './App.styled';

export const App = () => {
  return (
    <AppContainer>
      <Searchbar />
      <GlobalStyle />
    </AppContainer>
  );
};
