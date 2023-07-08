import './App.css';
import { Routes, Route } from 'react-router-dom';
import ShowRegions from './components/showRegion/showRegions';
import Country from './components/Country/Country';
import State from './components/State/State';
import Forcast from './components/Forcast/Forcast';
import City from './components/City/City';
import Navbar from './components/NavBar/Navbar';
import SearchForcast from './components/SearchForcast/searchForcast';
import About from './components/About/About';

const App = () => (
  <>
    <Navbar />
    <Routes>
      <Route path="/" element={<ShowRegions />} />
      <Route path="/Country/:regionId" element={<Country />} />
      <Route path="/State/:countryId" element={<State />} />
      <Route path="/City/:stateId" element={<City />} />
      <Route path="/Forcast/:cityName" element={<Forcast />} />
      <Route path="/searchForcast/:latitude/:longitude" element={<SearchForcast />} />
      <Route path="/About" element={<About />} />
    </Routes>
  </>

);

export default App;
