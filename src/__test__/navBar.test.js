import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Navbar from '../components/NavBar/Navbar';

describe('Navbar', () => {
  test('renders the logo and title', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );

    const logo = screen.getByAltText('Saturn Logo');
    const title = screen.getByText('BuWeather');

    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test('navigates back to the homepage when the back button is clicked', () => {
    const mockNavigate = jest.fn();
    const mockLocation = { pathname: '/otherpage' };

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );

    window.history.pushState({}, 'Test page', '/otherpage');

    jest.spyOn(window.history, 'goBack');
    jest.spyOn(window.history, 'pushState');
    jest.spyOn(window.history, 'replaceState');
    window.history.pushState({}, 'Test page', '/otherpage');

    fireEvent.click(screen.getByRole('button'));

    expect(window.history.goBack).toHaveBeenCalledTimes(1);
    expect(window.history.replaceState).toHaveBeenCalledWith({}, '', '/');

    window.history.pushState({}, 'Test page', '/otherpage');

    fireEvent.click(screen.getByRole('button'));

    expect(window.history.goBack).toHaveBeenCalledTimes(1);
    expect(window.history.replaceState).toHaveBeenCalledWith({}, '', '/');
  });

  test('displays suggestions when the search input is clicked and hides them when clicked outside', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );

    const searchField = screen.getByPlaceholderText('search');
    const suggestionList = screen.getByTestId('suggestion-list');

    fireEvent.click(searchField);
    expect(suggestionList).toBeInTheDocument();

    fireEvent.click(document.body);
    expect(suggestionList).not.toBeInTheDocument();
  });

  test('dispatches fetchCities action when the search input value changes', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </Provider>,
    );

    const searchField = screen.getByPlaceholderText('search');

    fireEvent.change(searchField, { target: { value: 'London' } });

    // Write your assertion here based on how
    // you expect your component to handle the dispatched action
  });
});
