import { configureStore } from '@reduxjs/toolkit';
import axios from 'axios';
import weatherSlice, {
  fetchRegions,
  fetchCountries,
  fetchStates,
  fetchCities,
  fetchForcast,
} from '../redux/slices/WeatherSlice';

jest.mock('axios');

describe('weatherSlice', () => {
  let store;

  beforeEach(() => {
    store = configureStore({
      reducer: {
        weather: weatherSlice.reducer,
      },
    });
  });

  it('should fetch regions and update the state', async () => {
    const mockedRegions = [
      { regionId: 'AF', name: 'Africa' },
      { regionId: 'EU', name: 'Europe' },
    ];

    axios.request.mockResolvedValueOnce({ data: mockedRegions });

    await store.dispatch(fetchRegions());
    const { regions } = store.getState().weather;
    expect(regions).toHaveLength(2);
  });

  it('should fetch countries and update the state', async () => {
    const mockedCountries = [
      { countryId: 'US', name: 'United States' },
      { countryId: 'CA', name: 'Canada' },
      { countryId: 'GB', name: 'United Kingdom' },
    ];

    axios.request.mockResolvedValueOnce({ data: mockedCountries });

    await store.dispatch(fetchCountries('regionId'));
    const { countries } = store.getState().weather;
    expect(countries).toHaveLength(3);
  });

  it('should fetch states and update the state', async () => {
    const mockedStates = [
      { stateId: 'NY', name: 'New York' },
      { stateId: 'CA', name: 'California' },
      { stateId: 'TX', name: 'Texas' },
      { stateId: 'FL', name: 'Florida' },
    ];

    axios.request.mockResolvedValueOnce({ data: mockedStates });

    await store.dispatch(fetchStates('countryId'));
    const { states } = store.getState().weather;
    expect(states).toHaveLength(4);
  });

  it('should fetch cities and update the state', async () => {
    const mockedCities = [
      { cityId: 'NYC', name: 'New York City' },
      { cityId: 'LA', name: 'Los Angeles' },
      { cityId: 'SF', name: 'San Francisco' },
      { cityId: 'MIA', name: 'Miami' },
      { cityId: 'CHI', name: 'Chicago' },
    ];

    axios.request.mockResolvedValueOnce({ data: mockedCities });

    await store.dispatch(fetchCities('stateId'));
    const { cities } = store.getState().weather;
    expect(cities).toHaveLength(5);
  });

  it('should fetch forecast and update the state', async () => {
    const mockedLocationResponse = {
      data: { location: { longitude: [0], latitude: [0] } },
    };

    const mockedForecastResponse = {
      data: {
        'v3-wx-observations-current': {
          dayOfWeek: 'Monday',
          cloudCoverPhrase: 'Sunny',
          temperature: 28,
          windSpeed: 10,
        },
      },
    };

    axios.request
      .mockResolvedValueOnce(mockedLocationResponse)
      .mockResolvedValueOnce(mockedForecastResponse);

    await store.dispatch(fetchForcast('cityName'));
    const { forcast } = store.getState().weather;
    expect(forcast).toEqual({
      day: 'Monday',
      weather: 'Sunny',
      temperature: 28,
      windSpeed: 10,
    });
  });
});
