import React from 'react';
import { render, screen } from '@testing-library/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForcast } from '../redux/slices/forcast-by-text-slice';
import SearchForcast from '../components/SearchForcast/searchForcast';

jest.mock('react-redux');
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: () => ({
    latitude: '123',
    longitude: '456',
  }),
}));
jest.mock('../redux/slices/forcast-by-text-slice', () => ({
  fetchForcast: jest.fn(),
}));

describe('SearchForcast', () => {
  beforeEach(() => {
    useDispatch.mockReturnValue(jest.fn());
    useSelector.mockImplementation((selectorFn) => selectorFn({
      forcastByText: {
        forcast: {
          name: 'City Name',
          region: 'Region Name',
          country: 'Country Name',
          day: 'Monday',
          weather: 'Sunny',
          temperature: '25°C',
          feelsLike: '23°C',
          windSpeed: '10 mph',
          winddir: 'NE',
          icon: 'weather-icon-url',
        },
      },
    }));
  });

  test('dispatches fetchForcast action on component mount', () => {
    render(<SearchForcast />);
    expect(fetchForcast).toHaveBeenCalledTimes(1);
    expect(fetchForcast).toHaveBeenCalledWith({ latitude: '123', longitude: '456' });
  });

  test('displays forcast information', () => {
    render(<SearchForcast />);
    expect(screen.getByAltText('weather icon')).toBeInTheDocument();
    expect(screen.getByText('City Name')).toBeInTheDocument();
    expect(screen.getByText('Region Name')).toBeInTheDocument();
    expect(screen.getByText('Country Name')).toBeInTheDocument();
    expect(screen.getByText('Monday')).toBeInTheDocument();
    expect(screen.getByText('Sunny')).toBeInTheDocument();
    expect(screen.getByText('Temperature: 25°C')).toBeInTheDocument();
    expect(screen.getByText('feelsLike: 23°C')).toBeInTheDocument();
    expect(screen.getByText('Wind Speed: 10 mph')).toBeInTheDocument();
    expect(screen.getByText('Wind Direction: NE')).toBeInTheDocument();
  });
});
