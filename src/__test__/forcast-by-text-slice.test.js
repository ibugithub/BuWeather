import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import forcastByTextSlice, { fetchForcast } from '../redux/slices/forcast-by-text-slice';

jest.mock('axios');

describe('forcastByTextSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        forcastByText: forcastByTextSlice.reducer,
      },
    });
  });

  it('should fetch forecast and update the state', async () => {
    const mockedForecast = {
      location: {
        localtime: '2023-07-05 10:00',
        name: 'City 1',
        region: 'Region 1',
        country: 'Country 1',
      },
      current: {
        condition: {
          text: 'Sunny',
          icon: 'sunny-icon',
        },
        temp_c: 25,
        feelslike_c: 28,
        wind_kph: 10,
        wind_dir: 'NW',
      },
    };

    axios.request.mockResolvedValueOnce({ data: mockedForecast });

    await store.dispatch(fetchForcast({ latitude: 10.123, longitude: 20.456 }));
    const { forcast } = store.getState().forcastByText;
    expect(forcast).toEqual({
      day: '2023-07-05 10:00',
      name: 'City 1',
      region: 'Region 1',
      country: 'Country 1',
      weather: 'Sunny',
      icon: 'sunny-icon',
      temperature: 25,
      feelsLike: 28,
      windSpeed: 10,
      winddir: 'NW',
    });
  });
});
