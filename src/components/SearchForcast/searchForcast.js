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
    <div className="weathercontainer">
      <img className="weatherImg" src={forcastInfo.icon} alt="weather icon" />
      <div className="weatherUl weatherCard">
        <ul className="ul1">
          <li className="weatherLi">{forcastInfo.name}</li>
          <li className="weatherLi">{forcastInfo.region}</li>
          <li className="weatherLi">{forcastInfo.country}</li>
          <li className="weatherLi">{forcastInfo.day}</li>
        </ul>
        <ul className="ul2">
          <li className="weatherLi">{forcastInfo.weather}</li>
          <li className="weatherLi">
            Temperature:
            {' '}
            {forcastInfo.temperature}
          </li>
          <li className="weatherLi">
            feelsLike:
            { ' '}
            {forcastInfo.feelsLike}
          </li>

        </ul>
        <ul className="ul3">
          <li className="weatherLi">
            Wind Speed:
            {' '}
            {forcastInfo.windSpeed}
          </li>
          <li className="weatherLi">
            Wind Direction:
            {' '}
            {forcastInfo.winddir}
          </li>
        </ul>

      </div>
    </div>

  );
};

export default SearchForcast;
