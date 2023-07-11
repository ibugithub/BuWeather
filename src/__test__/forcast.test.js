/* eslint-disable no-unused-vars */
import React from 'react';
import { render, screen } from '@testing-library/react';
import {
  BrowserRouter, Route, Routes, useParams,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchForcast } from '../redux/slices/WeatherSlice';
import Forcast from '../components/Forcast/Forcast';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../redux/slices/WeatherSlice', () => ({
  fetchForcast: jest.fn(),
}));

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    cityName: 'cityName', // Replace with your desired city name
  }),
}));

describe('Forcast', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      weather: {
        forcast: {
          day: 'Monday',
          weather: 'Sunny',
          temperature: '25°C',
          windSpeed: '10 mph',
        },
        isUpdating: false,
        error: null,
      },
    });

    store.dispatch = jest.fn();
  });

  test('dispatches fetchForcast action on component mount', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Forcast />
        </BrowserRouter>
      </Provider>,
    );

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(fetchForcast).toHaveBeenCalledWith('cityName');
  });
});
