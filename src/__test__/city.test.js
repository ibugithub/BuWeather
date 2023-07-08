import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchCities } from '../redux/slices/WeatherSlice';
import City from '../components/City/City';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../redux/slices/WeatherSlice', () => ({
  fetchCities: jest.fn(),
}));

describe('City', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      weather: {
        cities: [
          { cityId: 1, name: 'City 1' },
          { cityId: 2, name: 'City 2' },
        ],
        isUpdating: false,
        error: null,
      },
    });

    store.dispatch = jest.fn();
  });

  test('dispatches fetchCities action on component mount', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/state/1']}>
          <Routes>
            <Route path="/state/:stateId" element={<City />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(fetchCities).toHaveBeenCalledWith('1');
  });

  test('displays list of cities', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/state/1']}>
          <Routes>
            <Route path="/state/:stateId" element={<City />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const cityLinks = screen.getAllByRole('link');
    expect(cityLinks).toHaveLength(2);
    expect(cityLinks[0].textContent).toBe('City 1');
    expect(cityLinks[1].textContent).toBe('City 2');
  });
});
