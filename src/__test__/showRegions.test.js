import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ShowRegions from '../components/showRegion/showRegions';
import { fetchRegions } from '../redux/slices/WeatherSlice';

const mockStore = configureStore([]);

jest.mock('../redux/slices/WeatherSlice', () => ({
  fetchRegions: jest.fn(),
}));

describe('ShowRegions', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      weather: {
        regions: [
          { regionId: 1, name: 'Region 1' },
          { regionId: 2, name: 'Region 2' },
        ],
        isUpdating: false,
        error: null,
      },
    });

    store.dispatch = jest.fn();
  });

  test('renders regions', () => {
    render(
      <Provider store={store}>
        <Router>
          <ShowRegions />
        </Router>
      </Provider>,
    );

    const region1 = screen.getByText('Region 1');
    const region2 = screen.getByText('Region 2');

    expect(region1).toBeInTheDocument();
    expect(region2).toBeInTheDocument();
  });

  test('dispatches fetchRegions action on component mount', () => {
    render(
      <Provider store={store}>
        <Router>
          <ShowRegions />
        </Router>
      </Provider>,
    );

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(fetchRegions).toHaveBeenCalledTimes(1);
  });
});
