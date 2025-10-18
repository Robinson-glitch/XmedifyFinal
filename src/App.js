import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home.jsx';
import MyBookings from './MyBookings/MyBookings.jsx';
import HospitalCard from './components/HospitalCard/HospitalCard.jsx'
import SearchHospital from './components/SearchHospital/SearchHospital.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/my-bookings" element={<MyBookings />} />
      <Route path="/searchHospital" element={<SearchHospital/>} />
    </Routes>
  );
}

export default App;