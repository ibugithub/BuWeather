import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const appId = '3e23859a70msh24ff10192c00a8dp1962edjsn2a9fc0364514';

const initialState = {
  regions: [],
  countries: [],
  states: [],
  cities: [],
  forcast: [],
  isUpdating: false,
  error: null,
};

const fetchRegions = createAsyncThunk('weather/fetchRegions', async () => {
  const options = {
    method: 'GET',
    url: 'https://referential.p.rapidapi.com/v1/continent',
    params: { lang: 'en' },
    headers: {
      'X-RapidAPI-Key': appId,
      'X-RapidAPI-Host': 'referential.p.rapidapi.com',
    },
  };
  try {
    const getRegions = await axios.request(options);
    const regions = getRegions.data;
    return regions;
  } catch (error) {
    throw Error(error);
  }
});

const fetchCountries = createAsyncThunk('weather/fetchCountries', async (regionId) => {
  const options = {
    method: 'GET',
    url: 'https://referential.p.rapidapi.com/v1/country',
    params: {
      fields: 'continent_code',
      continent_code: regionId,
      lang: 'en',
      limit: '250',
    },
    headers: {
      'X-RapidAPI-Key': '3e23859a70msh24ff10192c00a8dp1962edjsn2a9fc0364514',
      'X-RapidAPI-Host': 'referential.p.rapidapi.com',
    },
  };
  try {
    const getCountries = await axios.request(options);
    const countries = getCountries.data;
    return countries;
  } catch (error) {
    throw Error('Failed to get Countries', error);
  }
});

const fetchStates = createAsyncThunk('weather/fetchStates', async (countryId) => {
  const options = {
    method: 'GET',
    url: 'https://referential.p.rapidapi.com/v1/state',
    params: {
      fields: 'iso_a2',
      iso_a2: countryId,
      lang: 'en',
      limit: '250',
    },
    headers: {
      'X-RapidAPI-Key': '3e23859a70msh24ff10192c00a8dp1962edjsn2a9fc0364514',
      'X-RapidAPI-Host': 'referential.p.rapidapi.com',
    },
  };
  try {
    const getStates = await axios.request(options);
    const states = getStates.data;
    return states;
  } catch (error) {
    throw Error('Failed to get Countries', error);
  }
});

const fetchCities = createAsyncThunk('weather/fetchCities', async (stateId) => {
  const options = {
    method: 'GET',
    url: 'https://referential.p.rapidapi.com/v1/city',
    params: {
      fields: 'state_code',
      lang: 'en',
      state_code: stateId,
      limit: '250',
    },
    headers: {
      'X-RapidAPI-Key': '3e23859a70msh24ff10192c00a8dp1962edjsn2a9fc0364514',
      'X-RapidAPI-Host': 'referential.p.rapidapi.com',
    },
  };

  try {
    const getCities = await axios.request(options);
    const cities = getCities.data;
    return cities;
  } catch (error) {
    throw Error('Failed to get Countries', error);
  }
});

const fetchForcast = createAsyncThunk('weather/fetchForcast', async (cityName) => {
  const options = {
    method: 'GET',
    url: 'https://weather338.p.rapidapi.com/locations/search',
    params: {
      query: cityName,
      language: 'en-US',
    },
    headers: {
      'X-RapidAPI-Key': '3e23859a70msh24ff10192c00a8dp1962edjsn2a9fc0364514',
      'X-RapidAPI-Host': 'weather338.p.rapidapi.com',
    },
  };
  let getInfo;
  try {
    getInfo = await axios.request(options);
  } catch (error) {
    throw Error('Failed to get Countries', error);
  }
  const { location } = getInfo.data;
  const Longitude = location.longitude[0];
  const Latitude = location.latitude[0];

  const options2 = {
    method: 'GET',
    url: 'https://weather338.p.rapidapi.com/weather/forecast',
    params: {
      date: '20200622',
      latitude: Latitude,
      longitude: Longitude,
      language: 'en-US',
      units: 'm',
    },
    headers: {
      'X-RapidAPI-Key': '3e23859a70msh24ff10192c00a8dp1962edjsn2a9fc0364514',
      'X-RapidAPI-Host': 'weather338.p.rapidapi.com',
    },
  };
  try {
    const getForcast = await axios.request(options2);
    const forcast = getForcast.data['v3-wx-observations-current'];
    const forcastInfo = {
      day: forcast.dayOfWeek,
      weather: forcast.cloudCoverPhrase,
      temperature: forcast.temperature,
      windSpeed: forcast.windSpeed,
    };
    return forcastInfo;
  } catch (error) {
    throw Error('Failed to get Countries', error);
  }
});

const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchRegions.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(fetchRegions.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.error = null;
        const regions = action.payload.map((region) => (
          {
            regionId: region.key,
            name: region.value,
          }
        ));
        state.regions = regions;
      })
      .addCase(fetchRegions.rejected, ((state, action) => {
        state.isUpdating = false;
        state.error = action.error.message;
      }));

    builder
      .addCase(fetchCountries.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(fetchCountries.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.error = null;
        const countries = action.payload.map((country) => (
          {
            countryId: country.key,
            name: country.value,
          }
        ));
        state.countries = countries;
      })
      .addCase(fetchCountries.rejected, ((state, action) => {
        state.isUpdating = false;
        state.error = action.error.message;
      }));

    builder
      .addCase(fetchStates.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(fetchStates.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.error = null;
        const myStates = action.payload.map((myState) => (
          {
            stateId: myState.key,
            name: myState.value,
          }
        ));
        state.states = myStates;
      })
      .addCase(fetchStates.rejected, ((state, action) => {
        state.isUpdating = false;
        state.error = action.error.message;
      }));

    builder
      .addCase(fetchCities.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(fetchCities.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.error = null;
        const cities = action.payload.map((city) => (
          {
            cityId: city.key,
            name: city.value,
          }
        ));
        state.cities = cities;
      })
      .addCase(fetchCities.rejected, ((state, action) => {
        state.isUpdating = false;
        state.error = action.error.message;
      }));

    builder
      .addCase(fetchForcast.pending, (state) => {
        state.isUpdating = true;
        state.error = null;
      })
      .addCase(fetchForcast.fulfilled, (state, action) => {
        state.isUpdating = false;
        state.error = null;
        state.forcast = action.payload;
      })
      .addCase(fetchForcast.rejected, ((state, action) => {
        state.isUpdating = false;
        state.error = action.error.message;
      }));
  },
});

export default weatherSlice;
export {
  fetchRegions, fetchCountries, fetchStates, fetchCities, fetchForcast,
};
