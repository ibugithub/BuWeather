import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cities: [],
  forcast: [],
};

const fetchCities = createAsyncThunk('forcastByText/fetchCities', async (text) => {
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/search.json',
    params: { q: text },
    headers: {
      'X-RapidAPI-Key': '3e23859a70msh24ff10192c00a8dp1962edjsn2a9fc0364514',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
});

const fetchForcast = createAsyncThunk('forcastByText/fetchForcast', async (value) => {
  const lat = value.latitude;
  const lon = value.longitude;
  const options = {
    method: 'GET',
    url: 'https://weatherapi-com.p.rapidapi.com/current.json',
    params: { q: `${lat},${lon}` },
    headers: {
      'X-RapidAPI-Key': '3e23859a70msh24ff10192c00a8dp1962edjsn2a9fc0364514',
      'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    return response.data;
  } catch (error) {
    throw Error(error);
  }
});

const forcastByTextSlice = createSlice({
  name: 'forcastByText',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchCities.fulfilled, (state, action) => {
        const updatedInfo = action.payload.map((info) => (
          {
            id: info.id,
            name: info.name,
            region: info.region,
            country: info.country,
            latitude: info.lat,
            longitude: info.lon,
          }
        ));
        return {
          ...state,
          cities: updatedInfo,
        };
      })

      .addCase(fetchForcast.fulfilled, (state, action) => {
        const info = action.payload;
        const updatedForcast = {
          day: info.location.localtime,
          name: info.location.name,
          region: info.location.region,
          country: info.location.country,
          weather: info.current.condition.text,
          icon: info.current.condition.icon,
          temperature: info.current.temp_c,
          feelsLike: info.current.feelslike_c,
          windSpeed: info.current.wind_kph,
          winddir: info.current.wind_dir,
        };
        return {
          ...state,
          forcast: updatedForcast,
        };
      });
  },
});

export default forcastByTextSlice;
export { fetchCities, fetchForcast };
