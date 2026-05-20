import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import About from './pages/About';
import Navbar from './components/Navbar';
import Mainpage from './pages/mainpage';

function App() {
  return (
    /* This wrapper removes the white gaps and sets the global background */
    <div style={{ 
      margin: 0, 
      padding: 0, 
      minHeight: '100vh', 
      backgroundColor: '#000', // Matches your theme to hide the "white frame"
      width: '100%'
    }}>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Mainpage />} />
          <Route path="/mainpage" element={<Mainpage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;