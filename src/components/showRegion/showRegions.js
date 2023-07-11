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
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Currently no data available</div>;
  }

  return (
    <div className="show-regions-container">
      {regions.map((region) => (
        <div className="show-regions-card" key={region.regionId}>
          <NavLink to={`/Country/${region.regionId}`}>
            <h4>{region.name}</h4>
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default ShowRegions;
