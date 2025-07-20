import { useState, useEffect } from 'react';
import { duenoAPI, mascotaAPI, veterinarioAPI, reservaAPI } from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const [stats, setStats] = useState({
    duenos: 0,
    mascotas: 0,
    veterinarios: 0,
    reservas: 0
  });
  const [recentReservas, setRecentReservas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [duenosRes, mascotasRes, veterinariosRes, reservasRes] = await Promise.all([
        duenoAPI.getAll(),
        mascotaAPI.getAll(),
        veterinarioAPI.getAll(),
        reservaAPI.getAll()
      ]);

      setStats({
        duenos: duenosRes.data.length,
        mascotas: mascotasRes.data.length,
        veterinarios: veterinariosRes.data.length,
        reservas: reservasRes.data.length
      });

      // Obtener las 5 reservas más recientes
      const sortedReservas = reservasRes.data
        .sort((a, b) => new Date(b.fecha) - new Date(a.fecha))
        .slice(0, 5);
      
      setRecentReservas(sortedReservas);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  if (loading) return <div className="loading">Cargando dashboard...</div>;

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Dashboard - Clínica Veterinaria</h1>
        <p>Resumen general del sistema</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card duenos">
          <div className="stat-icon">👥</div>
          <div className="stat-content">
            <h3>{stats.duenos}</h3>
            <p>Dueños Registrados</p>
          </div>
        </div>

        <div className="stat-card mascotas">
          <div className="stat-icon">🐕</div>
          <div className="stat-content">
            <h3>{stats.mascotas}</h3>
            <p>Mascotas Registradas</p>
          </div>
        </div>

        <div className="stat-card veterinarios">
          <div className="stat-icon">👨‍⚕️</div>
          <div className="stat-content">
            <h3>{stats.veterinarios}</h3>
            <p>Veterinarios</p>
          </div>
        </div>

        <div className="stat-card reservas">
          <div className="stat-icon">📅</div>
          <div className="stat-content">
            <h3>{stats.reservas}</h3>
            <p>Reservas Totales</p>
          </div>
        </div>
      </div>

      <div className="recent-section">
        <h2>Reservas Recientes</h2>
        <div className="recent-reservas">
          {recentReservas.length > 0 ? (
            <table className="recent-table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Hora</th>
                  <th>Procedimiento</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentReservas.map(reserva => (
                  <tr key={reserva.id}>
                    <td>{formatDate(reserva.fecha)}</td>
                    <td>{reserva.hora}</td>
                    <td>{reserva.tipo_procedimiento}</td>
                    <td>
                      <span className={`status ${new Date(reserva.fecha) >= new Date() ? 'pending' : 'completed'}`}>
                        {new Date(reserva.fecha) >= new Date() ? 'Pendiente' : 'Completada'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="no-data">No hay reservas registradas</p>
          )}
        </div>
      </div>

      <div className="quick-actions">
        <h2>Acciones Rápidas</h2>
        <div className="actions-grid">
          <a href="/duenos" className="action-card">
            <div className="action-icon">👥</div>
            <h3>Gestionar Dueños</h3>
            <p>Agregar, editar o eliminar dueños</p>
          </a>
          
          <a href="/mascotas" className="action-card">
            <div className="action-icon">🐕</div>
            <h3>Gestionar Mascotas</h3>
            <p>Registrar nuevas mascotas</p>
          </a>
          
          <a href="/veterinarios" className="action-card">
            <div className="action-icon">👨‍⚕️</div>
            <h3>Gestionar Veterinarios</h3>
            <p>Administrar personal médico</p>
          </a>
          
          <a href="/reservas" className="action-card">
            <div className="action-icon">📅</div>
            <h3>Nueva Reserva</h3>
            <p>Programar citas y procedimientos</p>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
