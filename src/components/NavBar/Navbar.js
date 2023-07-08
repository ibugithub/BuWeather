import React, { useState, useRef, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';
import { useDispatch, useSelector } from 'react-redux';
import saturn from '../../images/saturn.png';
import { fetchCities } from '../../redux/slices/forcast-by-text-slice';

const Navbar = () => {
  const navBar = useRef(null);
  const navContainer = useRef(null);
  const separator = useRef(null);
  const infoList = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const notInHomePage = location.pathname !== '/';
  const dispatch = useDispatch();
  const [textValue, setTextValue] = useState('');
  const cities = useSelector((state) => state.forcastByText.cities);
  const [isInput, setIsInput] = useState(false);

  useEffect(() => {
    const checkOutsideClick = (event) => {
      if (infoList.current && !infoList.current.contains(event.target)) {
        setIsInput(false);
      }
    };

    document.addEventListener('mousedown', checkOutsideClick);

    return () => {
      document.removeEventListener('mousedown', checkOutsideClick);
    };
  }, []);

  const handleChange = (event) => {
    setTextValue(event.target.value);
    if (textValue !== '') {
      dispatch(fetchCities(textValue));
    }
  };

  const handleClick = () => {
    setIsInput(!isInput);
  };

  const handleGoBack = () => {
    navigate('/');
  };

  return (
    <nav id="nav" ref={navContainer} data-testid="nav-container">
      <div className="logo_title_container">
        {notInHomePage && (
          <button type="button" onClick={handleGoBack}>
            {' '}
            {'<'}
            {' '}
          </button>
        )}
        <img className="logo" src={saturn} alt="Saturn Logo" />
        <h3 className="fontW400 margin0">BuWeather</h3>
      </div>

      <div>
        <ul className="NavBar_ul" data-testid="navBar" ref={navBar}>
          <li className="margin-bottom0">
            <input
              onClick={handleClick}
              id="searchField"
              type="text"
              placeholder="search"
              onChange={handleChange}
              value={textValue}
            />
            {isInput && (
              <ul ref={infoList} className="suggestion-list" data-testid="suggestion-list">
                {cities.map((city) => (
                  <li key={city.id}>
                    <NavLink to={`/searchForcast/${city.latitude}/${city.longitude}`}>
                      {city.name}
                      {' '}
                      {city.region}
                      {' '}
                      {city.country}
                    </NavLink>
                  </li>
                ))}
              </ul>
            )}
          </li>
          <li className="profileLi margin-bottom0">
            <div ref={separator} className="spearator" data-testid="separator" />
            <NavLink to="/About"> About </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
