import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import { fetchStates } from '../../redux/slices/WeatherSlice';
import './State.css';

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
    <div className="state-list-container">
      {states.map((state) => (
        <div className="state-list-item" key={state.stateId}>
          <NavLink to={`/City/${state.stateId}`}>
            {state.name}
          </NavLink>
        </div>
      ))}
    </div>
  );
};

export default State;
