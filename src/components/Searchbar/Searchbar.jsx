import { Component } from 'react';
import { FaSearch } from 'react-icons/fa';
import {
  SearchbarHeader,
  SearchForm,
  SearchButton,
  ButtonLabel,
  Input,
} from './Searchbar.styled';

export class Searchbar extends Component {
  render() {
    return (
      <SearchbarHeader>
        <SearchForm>
          <SearchButton type="submit">
            <FaSearch />
            <ButtonLabel>Search</ButtonLabel>
          </SearchButton>

          <Input
            type="text"
            autocomplete="off"
            autofocus
            placeholder="Search images and photos"
          />
        </SearchForm>
      </SearchbarHeader>
    );
  }
}
