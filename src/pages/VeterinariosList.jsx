import { useState, useEffect } from 'react';
import { veterinarioAPI } from '../services/api';
import VeterinarioForm from '../components/VeterinarioForm';
import './EntityList.css';

function VeterinariosList() {
  const [veterinarios, setVeterinarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingVeterinario, setEditingVeterinario] = useState(null);

  useEffect(() => {
    fetchVeterinarios();
  }, []);

  const fetchVeterinarios = async () => {
    try {
      const response = await veterinarioAPI.getAll();
      setVeterinarios(response.data);
    } catch (error) {
      console.error('Error fetching veterinarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Está seguro de eliminar este veterinario?')) {
      try {
        await veterinarioAPI.delete(id);
        fetchVeterinarios();
      } catch (error) {
        console.error('Error deleting veterinario:', error);
      }
    }
  };

  const handleEdit = (veterinario) => {
    setEditingVeterinario(veterinario);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingVeterinario(null);
    fetchVeterinarios();
  };

  if (loading) return <div className="loading">Cargando...</div>;

  return (
    <div className="entity-list">
      <div className="list-header">
        <h2>Gestión de Veterinarios</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowForm(true)}
        >
          Nuevo Veterinario
        </button>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Especialidad</th>
              <th>Teléfono</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {veterinarios.map(veterinario => (
              <tr key={veterinario.id}>
                <td>{veterinario.nombre_completo}</td>
                <td>{veterinario.especialidad}</td>
                <td>{veterinario.telefono}</td>
                <td>
                  <button 
                    className="btn btn-secondary"
                    onClick={() => handleEdit(veterinario)}
                  >
                    Editar
                  </button>
                  <button 
                    className="btn btn-danger"
                    onClick={() => handleDelete(veterinario.id)}
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
        <VeterinarioForm 
          veterinario={editingVeterinario}
          onClose={handleFormClose}
        />
      )}
    </div>
  );
}

export default VeterinariosList;
