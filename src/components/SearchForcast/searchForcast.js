import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchForcast } from '../../redux/slices/forcast-by-text-slice';
import './SearchForcast.css';

const SearchForcast = () => {
  const dispatch = useDispatch();
  const { latitude, longitude } = useParams();
  useEffect(() => {
    dispatch(fetchForcast({ latitude, longitude }));
  }, [dispatch, latitude, longitude]);

  const forcastInfo = useSelector((state) => state.forcastByText.forcast);

  return (
    <div className="search-forcast-container">
      <div className="weather-card">
        <img className="weather-icon" src={forcastInfo.icon} alt="weather icon" />
        <div className="weather-details">
          <h3 className="weather-title">{forcastInfo.name}</h3>
          <p className="weather-description">
            {forcastInfo.weather}
            {' '}
            (
            {forcastInfo.temperature}
            °C)
          </p>
          <div className="weather-extra">
            <div className="weather-info">
              <p className="weather-info-text">Feels Like</p>
              <p className="weather-info-value">
                {forcastInfo.feelsLike}
                °C
              </p>
            </div>
            <div className="weather-info">
              <p className="weather-info-text">Wind Speed</p>
              <p className="weather-info-value">
                {forcastInfo.windSpeed}
                {' '}
                km/h
              </p>
            </div>
            <div className="weather-info">
              <p className="weather-info-text">Wind Direction</p>
              <p className="weather-info-value">{forcastInfo.winddir}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchForcast;
