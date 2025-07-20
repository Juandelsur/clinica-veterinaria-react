import { useState, useEffect } from 'react';
import { duenoAPI } from '../services/api';
import DuenoForm from '../components/DuenoForm';
import './EntityList.css';

function DuenosList() {
  const [duenos, setDuenos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingDueno, setEditingDueno] = useState(null);

  useEffect(() => {
    fetchDuenos();
  }, []);

  const fetchDuenos = async () => {
    try {
      const response = await duenoAPI.getAll();
      setDuenos(response.data);
    } catch (error) {
      console.error('Error fetching dueños:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este dueño?')) {
      try {
        await duenoAPI.delete(id);
        fetchDuenos();
      } catch (error) {
        console.error('Error deleting dueño:', error);
      }
    }
  };

  const handleEdit = (dueno) => {
    setEditingDueno(dueno);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingDueno(null);
    fetchDuenos();
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className="entity-list">
      <div className="list-header">
        <h2>Gestión de Dueños</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Nuevo Dueño
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>RUT</th>
              <th>Teléfono</th>
              <th>Email</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {duenos.map(dueno => (
              <tr key={dueno.id}>
                <td>{dueno.nombre_completo}</td>
                <td>{dueno.rut}</td>
                <td>{dueno.telefono}</td>
                <td>{dueno.correo}</td>
                <td>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleEdit(dueno)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDelete(dueno.id)}
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
        <DuenoForm 
          dueno={editingDueno}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}

export default DuenosList;
