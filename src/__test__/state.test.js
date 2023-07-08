import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { fetchStates } from '../redux/slices/WeatherSlice';
import State from '../components/State';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

jest.mock('../redux/slices/WeatherSlice', () => ({
  fetchStates: jest.fn(),
}));

describe('State', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      weather: {
        states: [
          { stateId: 1, name: 'State 1' },
          { stateId: 2, name: 'State 2' },
        ],
        isUpdating: false,
        error: null,
      },
    });

    store.dispatch = jest.fn();
  });

  test('dispatches fetchStates action on component mount', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/country/1']}>
          <Routes>
            <Route path="/country/:countryId" element={<State />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    expect(store.dispatch).toHaveBeenCalledTimes(1);
    expect(fetchStates).toHaveBeenCalledWith('1');
  });

  test('displays list of states', () => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/country/1']}>
          <Routes>
            <Route path="/country/:countryId" element={<State />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );

    const stateLinks = screen.getAllByRole('link');
    expect(stateLinks).toHaveLength(2);
    expect(stateLinks[0].textContent).toBe('State 1');
    expect(stateLinks[1].textContent).toBe('State 2');
  });
});
