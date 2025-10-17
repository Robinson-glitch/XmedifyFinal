import { Routes, Route } from 'react-router-dom';
import Home from './Home/Home.jsx';
import MyBookings from './MyBookings/MyBookings.jsx';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/my-bookings" element={<MyBookings />} />
    </Routes>
  );
}

export default App;