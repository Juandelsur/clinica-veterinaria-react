import { useState, useEffect } from 'react';
import { duenoAPI } from '../services/api';
import './Form.css';

function DuenoForm({ dueno, onClose }) {
  const [formData, setFormData] = useState({
    nombre_completo: '',
    rut: '',
    telefono: '',
    correo: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (dueno) {
      setFormData(dueno);
    }
  }, [dueno]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre_completo.trim()) {
      newErrors.nombre_completo = 'El nombre es obligatorio';
    }
    
    if (!formData.rut.trim()) {
      newErrors.rut = 'El RUT es obligatorio';
    }
    
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es obligatorio';
    }
    
    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es obligatorio';
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = 'El correo no es válido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      if (dueno) {
        await duenoAPI.update(dueno.id, formData);
      } else {
        await duenoAPI.create(formData);
      }
      onClose();
    } catch (error) {
      console.error('Error saving dueño:', error);
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
          <h3>{dueno ? 'Editar Dueño' : 'Nuevo Dueño'}</h3>
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
            <label>RUT:</label>
            <input
              type="text"
              name="rut"
              value={formData.rut}
              onChange={handleChange}
              className={errors.rut ? 'error' : ''}
            />
            {errors.rut && <span className="error-text">{errors.rut}</span>}
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

          <div className="form-group">
            <label>Correo:</label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={handleChange}
              className={errors.correo ? 'error' : ''}
            />
            {errors.correo && <span className="error-text">{errors.correo}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {dueno ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DuenoForm;
