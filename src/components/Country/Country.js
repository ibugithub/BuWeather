import React, { useEffect } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCountries } from '../../redux/slices/WeatherSlice';
import './Country.css';

const Country = () => {
  const { regionId } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCountries(regionId));
  }, [dispatch, regionId]);

  const countries = useSelector((state) => state.weather.countries);
  const isUpdating = useSelector((state) => state.weather.isUpdating);
  const error = useSelector((state) => state.weather.error);

  if (isUpdating) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Currently no data available</div>;
  }

  return (
    <div className="country-list-container">
      {countries.map((country) => (
        <div className="country-list-item" key={country.countryId}>
          <NavLink to={`/State/${country.countryId}`}>{country.name}</NavLink>
        </div>
      ))}
    </div>
  );
};

export default Country;
