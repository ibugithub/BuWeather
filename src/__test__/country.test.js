import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchCountries } from '../redux/slices/WeatherSlice';
import Country from '../components/Country';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../redux/slices/WeatherSlice', () => ({
  fetchCountries: jest.fn(),
}));

describe('Country', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      weather: {
        countries: [
          { countryId: 1, name: 'Country 1' },
          { countryId: 2, name: 'Country 2' },
        ],
        isUpdating: false,
        error: null,
      },
    });

    store.dispatch = jest.fn();
  });

  test('dispatches fetchCountries action on component mount', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/region/1']}>
          <Routes>
            <Route path="/region/:regionId" element={<Country />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(fetchCountries).toHaveBeenCalledWith('1');
  });

  test('displays list of countries', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/region/1']}>
          <Routes>
            <Route path="/region/:regionId" element={<Country />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const countryLinks = screen.getAllByRole('link');
    expect(countryLinks).toHaveLength(2);
    expect(countryLinks[0].textContent.trim()).toBe('Country 1');
    expect(countryLinks[1].textContent.trim()).toBe('Country 2');
  });
});
