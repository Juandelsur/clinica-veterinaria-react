import { useState, useEffect } from 'react';
import { mascotaAPI, duenoAPI } from '../services/api';
import MascotaForm from '../components/MascotaForm';
import './EntityList.css';

function MascotasList() {
  const [mascotas, setMascotas] = useState([]);
  const [duenos, setDuenos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMascota, setEditingMascota] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [mascotasRes, duenosRes] = await Promise.all([
        mascotaAPI.getAll(),
        duenoAPI.getAll()
      ]);
      setMascotas(mascotasRes.data);
      setDuenos(duenosRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar esta mascota?')) {
      try {
        await mascotaAPI.delete(id);
        fetchData();
      } catch (error) {
        console.error('Error deleting mascota:', error);
      }
    }
  };

  const handleEdit = (mascota) => {
    setEditingMascota(mascota);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingMascota(null);
    fetchData();
  };

  const getDuenoName = (idDueno) => {
    const dueno = duenos.find(d => d.id === idDueno);
    return dueno ? dueno.nombre_completo : 'N/A';
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className="entity-list">
      <div className="list-header">
        <h2>Gestión de Mascotas</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Nueva Mascota
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Tipo</th>
              <th>Edad</th>
              <th>Raza</th>
              <th>Dueño</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {mascotas.map(mascota => (
              <tr key={mascota.id}>
                <td>{mascota.nombre_mascota}</td>
                <td>{mascota.tipo_animal}</td>
                <td>{mascota.edad} años</td>
                <td>{mascota.raza}</td>
                <td>{getDuenoName(mascota.id_dueno)}</td>
                <td>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleEdit(mascota)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDelete(mascota.id)}
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
        <MascotaForm 
          mascota={editingMascota}
          duenos={duenos}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}

export default MascotasList;
