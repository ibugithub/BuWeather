import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForcast } from '../redux/slices/WeatherSlice';

const Forcast = () => {
  const { cityName } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchForcast(cityName));
  }, [dispatch, cityName]);
  const forcastInfo = useSelector((state) => state.weather.forcast);
  const isUpdating = useSelector((state) => state.weather.isUpdating);
  const error = useSelector((state) => state.weather.error);

  if (isUpdating) {
    return (
      <div>
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div>
        Currently no data available
      </div>
    );
  }

  return (
    <>
      <li>
        {forcastInfo.day}
      </li>
      <li>
        {forcastInfo.weather}
      </li>
      <li>
        Temperature:
        {forcastInfo.temperature}
      </li>
      <li>
        Wind Speed:
        {forcastInfo.windSpeed}
      </li>
    </>
  );
};

export default Forcast;
