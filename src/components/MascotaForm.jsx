import { useState, useEffect } from 'react';
import { mascotaAPI } from '../services/api';
import './Form.css';

function MascotaForm({ mascota, duenos, onClose }) {
  const [formData, setFormData] = useState({
    nombre_mascota: '',
    tipo_animal: '',
    edad: '',
    raza: '',
    id_dueno: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (mascota) {
      setFormData(mascota);
    }
  }, [mascota]);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.nombre_mascota.trim()) {
      newErrors.nombre_mascota = 'El nombre es obligatorio';
    }
    
    if (!formData.tipo_animal.trim()) {
      newErrors.tipo_animal = 'El tipo de animal es obligatorio';
    }
    
    if (!formData.edad || formData.edad < 0) {
      newErrors.edad = 'La edad debe ser un número válido';
    }
    
    if (!formData.raza.trim()) {
      newErrors.raza = 'La raza es obligatoria';
    }
    
    if (!formData.id_dueno) {
      newErrors.id_dueno = 'Debe seleccionar un dueño';
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
        edad: parseInt(formData.edad),
        id_dueno: parseInt(formData.id_dueno)
      };

      if (mascota) {
        await mascotaAPI.update(mascota.id, dataToSend);
      } else {
        await mascotaAPI.create(dataToSend);
      }
      onClose();
    } catch (error) {
      console.error('Error saving mascota:', error);
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
          <h3>{mascota ? 'Editar Mascota' : 'Nueva Mascota'}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Nombre de la Mascota:</label>
            <input
              type="text"
              name="nombre_mascota"
              value={formData.nombre_mascota}
              onChange={handleChange}
              className={errors.nombre_mascota ? 'error' : ''}
            />
            {errors.nombre_mascota && <span className="error-text">{errors.nombre_mascota}</span>}
          </div>

          <div className="form-group">
            <label>Tipo de Animal:</label>
            <select
              name="tipo_animal"
              value={formData.tipo_animal}
              onChange={handleChange}
              className={errors.tipo_animal ? 'error' : ''}
            >
              <option value="">Seleccionar...</option>
              <option value="Perro">Perro</option>
              <option value="Gato">Gato</option>
              <option value="Ave">Ave</option>
              <option value="Conejo">Conejo</option>
              <option value="Otro">Otro</option>
            </select>
            {errors.tipo_animal && <span className="error-text">{errors.tipo_animal}</span>}
          </div>

          <div className="form-group">
            <label>Edad:</label>
            <input
              type="number"
              name="edad"
              value={formData.edad}
              onChange={handleChange}
              min="0"
              className={errors.edad ? 'error' : ''}
            />
            {errors.edad && <span className="error-text">{errors.edad}</span>}
          </div>

          <div className="form-group">
            <label>Raza:</label>
            <input
              type="text"
              name="raza"
              value={formData.raza}
              onChange={handleChange}
              className={errors.raza ? 'error' : ''}
            />
            {errors.raza && <span className="error-text">{errors.raza}</span>}
          </div>

          <div className="form-group">
            <label>Dueño:</label>
            <select
              name="id_dueno"
              value={formData.id_dueno}
              onChange={handleChange}
              className={errors.id_dueno ? 'error' : ''}
            >
              <option value="">Seleccionar dueño...</option>
              {duenos.map(dueno => (
                <option key={dueno.id} value={dueno.id}>
                  {dueno.nombre_completo} - {dueno.rut}
                </option>
              ))}
            </select>
            {errors.id_dueno && <span className="error-text">{errors.id_dueno}</span>}
          </div>

          <div className="form-actions">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              {mascota ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default MascotaForm;
