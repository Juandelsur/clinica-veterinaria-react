import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import DuenosList from './pages/DuenosList';
import MascotasList from './pages/MascotasList';
import VeterinariosList from './pages/VeterinariosList';
import ReservasList from './pages/ReservasList';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/duenos" element={<DuenosList />} />
            <Route path="/mascotas" element={<MascotasList />} />
            <Route path="/veterinarios" element={<VeterinariosList />} />
            <Route path="/reservas" element={<ReservasList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
