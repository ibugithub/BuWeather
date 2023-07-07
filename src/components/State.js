import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { fetchStates } from '../redux/slices/WeatherSlice';

const State = () => {
  const dispatch = useDispatch();
  const { countryId } = useParams();
  useEffect(() => {
    dispatch(fetchStates(countryId));
  }, [dispatch, countryId]);
  const states = useSelector((state) => state.weather.states);
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
      {states.map((state) => (
        <li key={state.stateId}>
          <NavLink to={`/City/${state.stateId}`}>
            {state.name}
          </NavLink>
        </li>
      ))}
    </>

  );
};

export default State;
