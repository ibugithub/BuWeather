import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchForcast } from '../redux/slices/forcast-by-text-slice';

const SearchForcast = () => {
  const dispatch = useDispatch();
  const { latitude, longitude } = useParams();
  useEffect(() => {
    dispatch(fetchForcast({ latitude, longitude }));
  }, [dispatch, latitude, longitude]);

  const forcastInfo = useSelector((state) => state.forcastByText.forcast);
  return (
    <>
      <img src={forcastInfo.icon} alt="weather icon" />
      <ul>
        <li>{forcastInfo.name}</li>
        <li>{forcastInfo.region}</li>
        <li>{forcastInfo.country}</li>
        <li>{forcastInfo.day}</li>
        <li>{forcastInfo.weather}</li>
        <li>
          Temperature:
          {' '}
          {forcastInfo.temperature}
        </li>
        <li>
          feelsLike:
          { ' '}
          {forcastInfo.feelsLike}
        </li>
        <li>
          Wind Speed:
          {' '}
          {forcastInfo.windSpeed}
        </li>
        <li>
          Wind Direction:
          {' '}
          {forcastInfo.winddir}
        </li>
      </ul>
    </>

  );
};

export default SearchForcast;
