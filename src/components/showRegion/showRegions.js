import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchRegions } from '../../redux/slices/WeatherSlice';
import './showRegions.css';

const ShowRegions = () => {
  const dispatch = useDispatch();
  const regions = useSelector((state) => state.weather.regions);
  useEffect(() => {
    dispatch(fetchRegions());
  }, [dispatch]);

  const isUpdating = useSelector((state) => state.weather.isUpdating);
  const error = useSelector((state) => state.weather.error);
  if (isUpdating) {
    return (
      <h3>Loading...</h3>
    );
  }

  if (error) {
    return (
      <h3>
        Currently no data available
      </h3>
    );
  }

  return (
    <div className="grid-container">
      {
        regions.map((region) => (
          <li className="contentContainer" key={region.regionId}>
            {' '}
            <NavLink to={`/Country/${region.regionId}`}>
              {region.name}
            </NavLink>
          </li>
        ))
      }
    </div>
  );
};

export default ShowRegions;
