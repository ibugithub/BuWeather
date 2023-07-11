import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { fetchCities } from '../../redux/slices/WeatherSlice';
import './City.css';

const City = () => {
  const dispatch = useDispatch();
  const { stateId } = useParams();
  useEffect(() => {
    dispatch(fetchCities(stateId));
  }, [dispatch, stateId]);
  const cities = useSelector((state) => state.weather.cities);
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
    <div className="city-list-container">
      {cities.map((city) => (
        <div className="city-list-item" key={city.cityId}>
          <NavLink to={`/Forcast/${city.name}`}>
            {city.name}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default City;
