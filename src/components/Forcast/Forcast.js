import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchForcast } from '../../redux/slices/WeatherSlice';
import './Forcast.css';

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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Currently no data available</div>;
  }

  return (
    <div className="forcast-container">
      <div className="forcast-card">
        <div className="forcast-info">
          <h3 className="forcast-day">{forcastInfo.day}</h3>
          <p className="forcast-weather">{forcastInfo.weather}</p>
          <p className="forcast-temperature">
            Temperature:
            {' '}
            {forcastInfo.temperature}
          </p>
          <p className="forcast-wind-speed">
            Wind Speed:
            {' '}
            {forcastInfo.windSpeed}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Forcast;
