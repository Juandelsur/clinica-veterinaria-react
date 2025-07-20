import { useState, useEffect } from 'react';
import { veterinarioAPI } from '../services/api';
import './Form.css';

function VeterinarioForm({ veterinario, onClose }) {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    especialidad: '',
    telefono: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (veterinario) {
      setFormData(veterinario);
    }
  }, [veterinario]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre_completo.trim()) {
      newErrors.nombre_completo = 'El nombre es obligatorio';
    }
    
    if (!formData.especialidad.trim()) {
      newErrors.especialidad = 'La especialidad es obligatoria';
    }
    
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      if (veterinario) {
        await veterinarioAPI.update(veterinario.id, formData);
      } else {
        await veterinarioAPI.create(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving veterinario:', error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h3>{veterinario ? 'Editar Veterinario' : 'Nuevo Veterinario'}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Nombre Completo:</label>
            <input
              type="text"
              name="nombre_completo"
              value={formData.nombre_completo}
              onChange={handleChange}
              className={errors.nombre_completo ? 'error' : ''}
            />
            {errors.nombre_completo && <span className="error-text">{errors.nombre_completo}</span>}
          </div>

          <div className="form-group">
            <label>Especialidad:</label>
            <select
              name="especialidad"
              value={formData.especialidad}
              onChange={handleChange}
              className={errors.especialidad ? 'error' : ''}
            >
              <option value="">Seleccionar...</option>
              <option value="Medicina General">Medicina General</option>
              <option value="Cirugía">Cirugía</option>
              <option value="Dermatología">Dermatología</option>
              <option value="Cardiología">Cardiología</option>
              <option value="Neurología">Neurología</option>
              <option value="Oncología">Oncología</option>
              <option value="Oftalmología">Oftalmología</option>
            </select>
            {errors.especialidad && <span className="error-text">{errors.especialidad}</span>}
          </div>

          <div className="form-group">
            <label>Teléfono:</label>
            <input
              type="text"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              className={errors.telefono ? 'error' : ''}
            />
            {errors.telefono && <span className="error-text">{errors.telefono}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {veterinario ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VeterinarioForm;
