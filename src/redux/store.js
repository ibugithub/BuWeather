import { configureStore } from '@reduxjs/toolkit';
import WeatherSlice from './slices/WeatherSlice';
import forcastByTextSlice from './slices/forcast-by-text-slice';

const store = configureStore({
  reducer: {
    weather: WeatherSlice.reducer,
    forcastByText: forcastByTextSlice.reducer,
  },
});

export default store;
