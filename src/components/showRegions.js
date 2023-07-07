import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { fetchRegions } from '../redux/slices/WeatherSlice';

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
    <div>
      <h3> Hello world</h3>
      {
        regions.map((region) => (
          <li key={region.regionId}>
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
