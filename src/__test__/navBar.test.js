import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Navbar from '../components/NavBar/Navbar';

const mockStore = configureStore([]);

describe('Navbar', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      forcastByText: {
        cities: [
          {
            id: 1, name: 'City 1', latitude: 1.23, longitude: 4.56,
          },
          {
            id: 2, name: 'City 2', latitude: 7.89, longitude: 0.12,
          },
        ],
      },
    });

    store.dispatch = jest.fn();
  });

  test('renders navbar with logo and title', () => {
    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>,
    );

    const logo = screen.getByAltText('Saturn Logo');
    const title = screen.getByText('BuWeather');

    expect(logo).toBeInTheDocument();
    expect(title).toBeInTheDocument();
  });

  test('search input should update textValue state', () => {
    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>,
    );

    const searchInput = screen.getByPlaceholderText('search');
    fireEvent.change(searchInput, { target: { value: 'City' } });

    expect(searchInput.value).toBe('City');
  });

  test('displays suggestion list when search input is clicked', () => {
    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>,
    );

    const searchInput = screen.getByPlaceholderText('search');
    fireEvent.click(searchInput);

    const suggestionList = screen.getByTestId('suggestion-list');
    expect(suggestionList).toBeInTheDocument();
  });

  test('navigates to About page when About link is clicked', () => {
    render(
      <Provider store={store}>
        <Router>
          <Navbar />
        </Router>
      </Provider>,
    );

    const aboutLink = screen.getByText('About');
    fireEvent.click(aboutLink);

    // Add your expectation for the navigation or use a mock router for testing navigation.
  });
});
