import { useState, useEffect } from 'react';
import { reservaAPI, mascotaAPI, veterinarioAPI } from '../services/api';
import ReservaForm from '../components/ReservaForm';
import './EntityList.css';

function ReservasList() {
  const [reservas, setReservas] = useState([]);
  const [mascotas, setMascotas] = useState([]);
  const [veterinarios, setVeterinarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingReserva, setEditingReserva] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [reservasRes, mascotasRes, veterinariosRes] = await Promise.all([
        reservaAPI.getAll(),
        mascotaAPI.getAll(),
        veterinarioAPI.getAll()
      ]);
      setReservas(reservasRes.data);
      setMascotas(mascotasRes.data);
      setVeterinarios(veterinariosRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta reserva?')) {
      try {
        await reservaAPI.delete(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting reserva:', error);
      }
    }
  };

  const handleEdit = (reserva) => {
    setEditingReserva(reserva);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingReserva(null);
    fetchData();
  };

  const getMascotaName = (idMascota) => {
    const mascota = mascotas.find(m => m.id === idMascota);
    return mascota ? mascota.nombre_mascota : 'N/A';
  };

  const getVeterinarioName = (idVeterinario) => {
    const veterinario = veterinarios.find(v => v.id === idVeterinario);
    return veterinario ? veterinario.nombre_completo : 'N/A';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('es-ES');
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className="entity-list">
      <div className="list-header">
        <h2>Gestión de Reservas</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Nueva Reserva
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Mascota</th>
              <th>Veterinario</th>
              <th>Procedimiento</th>
              <th>Fecha</th>
              <th>Hora</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reservas.map(reserva => (
              <tr key={reserva.id}>
                <td>{getMascotaName(reserva.id_mascota)}</td>
                <td>{getVeterinarioName(reserva.id_veterinario)}</td>
                <td>{reserva.tipo_procedimiento}</td>
                <td>{formatDate(reserva.fecha)}</td>
                <td>{reserva.hora}</td>
                <td>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleEdit(reserva)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDelete(reserva.id)}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <ReservaForm 
          reserva={editingReserva}
          mascotas={mascotas}
          veterinarios={veterinarios}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}

export default ReservasList;
