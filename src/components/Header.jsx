import { Link, useLocation } from 'react-router-dom';
import './Header.css';

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-content">
        <h1 className="logo">🐾 Clínica Veterinaria</h1>
        <nav className="nav">
          <Link 
            to="/" 
            className={`nav-link ${location.pathname === '/' ? 'active' : ''}`}
          >
            📊 Dashboard
          </Link>
          <Link 
            to="/duenos" 
            className={`nav-link ${location.pathname === '/duenos' ? 'active' : ''}`}
          >
            👥 Dueños
          </Link>
          <Link 
            to="/mascotas" 
            className={`nav-link ${location.pathname === '/mascotas' ? 'active' : ''}`}
          >
            🐕 Mascotas
          </Link>
          <Link 
            to="/veterinarios" 
            className={`nav-link ${location.pathname === '/veterinarios' ? 'active' : ''}`}
          >
            👨‍⚕️ Veterinarios
          </Link>
          <Link 
            to="/reservas" 
            className={`nav-link ${location.pathname === '/reservas' ? 'active' : ''}`}
          >
            📅 Reservas
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
