import { useState, useEffect } from 'react';
import { reservaAPI } from '../services/api';
import './Form.css';

function ReservaForm({ reserva, mascotas, veterinarios, onClose }) {
  const [formData, setFormData] = useState({
    id_mascota: '',
    id_veterinario: '',
    tipo_procedimiento: '',
    fecha: '',
    hora: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (reserva) {
      setFormData({
        ...reserva,
        fecha: reserva.fecha ? reserva.fecha.split('T')[0] : ''
      });
    }
  }, [reserva]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.id_mascota) {
      newErrors.id_mascota = 'Debe seleccionar una mascota';
    }
    
    if (!formData.id_veterinario) {
      newErrors.id_veterinario = 'Debe seleccionar un veterinario';
    }
    
    if (!formData.tipo_procedimiento.trim()) {
      newErrors.tipo_procedimiento = 'El tipo de procedimiento es obligatorio';
    }
    
    if (!formData.fecha) {
      newErrors.fecha = 'La fecha es obligatoria';
    }
    
    if (!formData.hora) {
      newErrors.hora = 'La hora es obligatoria';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      const dataToSend = {
        ...formData,
        id_mascota: parseInt(formData.id_mascota),
        id_veterinario: parseInt(formData.id_veterinario)
      };

      if (reserva) {
        await reservaAPI.update(reserva.id, dataToSend);
      } else {
        await reservaAPI.create(dataToSend);
      }
      onClose();
    } catch (error) {
      console.error('Error saving reserva:', error);
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
          <h3>{reserva ? 'Editar Reserva' : 'Nueva Reserva'}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Mascota:</label>
            <select
              name="id_mascota"
              value={formData.id_mascota}
              onChange={handleChange}
              className={errors.id_mascota ? 'error' : ''}
            >
              <option value="">Seleccionar mascota...</option>
              {mascotas.map(mascota => (
                <option key={mascota.id} value={mascota.id}>
                  {mascota.nombre_mascota} - {mascota.tipo_animal}
                </option>
              ))}
            </select>
            {errors.id_mascota && <span className="error-text">{errors.id_mascota}</span>}
          </div>

          <div className="form-group">
            <label>Veterinario:</label>
            <select
              name="id_veterinario"
              value={formData.id_veterinario}
              onChange={handleChange}
              className={errors.id_veterinario ? 'error' : ''}
            >
              <option value="">Seleccionar veterinario...</option>
              {veterinarios.map(veterinario => (
                <option key={veterinario.id} value={veterinario.id}>
                  {veterinario.nombre_completo} - {veterinario.especialidad}
                </option>
              ))}
            </select>
            {errors.id_veterinario && <span className="error-text">{errors.id_veterinario}</span>}
          </div>

          <div className="form-group">
            <label>Tipo de Procedimiento:</label>
            <select
              name="tipo_procedimiento"
              value={formData.tipo_procedimiento}
              onChange={handleChange}
              className={errors.tipo_procedimiento ? 'error' : ''}
            >
              <option value="">Seleccionar...</option>
              <option value="Consulta General">Consulta General</option>
              <option value="Vacunación">Vacunación</option>
              <option value="Cirugía">Cirugía</option>
              <option value="Desparasitación">Desparasitación</option>
              <option value="Control">Control</option>
              <option value="Emergencia">Emergencia</option>
            </select>
            {errors.tipo_procedimiento && <span className="error-text">{errors.tipo_procedimiento}</span>}
          </div>

          <div className="form-group">
            <label>Fecha:</label>
            <input
              type="date"
              name="fecha"
              value={formData.fecha}
              onChange={handleChange}
              min={new Date().toISOString().split('T')[0]}
              className={errors.fecha ? 'error' : ''}
            />
            {errors.fecha && <span className="error-text">{errors.fecha}</span>}
          </div>

          <div className="form-group">
            <label>Hora:</label>
            <input
              type="time"
              name="hora"
              value={formData.hora}
              onChange={handleChange}
              className={errors.hora ? 'error' : ''}
            />
            {errors.hora && <span className="error-text">{errors.hora}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {reserva ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReservaForm;
