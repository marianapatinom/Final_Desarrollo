import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Loading from '../components/Loading.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import {
  createReviewRequest,
  getReviewsRequest,
  updateReviewRequest
} from '../services/reviewService.js';

const initialForm = {
  restaurante: '',
  calificacion: '5',
  fechaVisita: '',
  observaciones: ''
};

function ReviewForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const isEditing = Boolean(id);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(isEditing);
  const [saving, setSaving] = useState(false);
  const [formBlocked, setFormBlocked] = useState(false);

  const title = useMemo(() => (isEditing ? 'Editar reseña' : 'Crear reseña'), [isEditing]);

  useEffect(() => {
    const loadReviewToEdit = async () => {
      if (!isEditing) return;

      try {
        setLoading(true);
        const response = await getReviewsRequest();
        const review = response.data.find((item) => item._id === id);

        if (!review) {
          setError('Reseña no encontrada');
          setFormBlocked(true);
          return;
        }

        const ownerId = review.usuario?._id || review.usuario?.id;
        if (ownerId !== user?.id) {
          setError('No puedes editar una reseña que pertenece a otro usuario');
          setFormBlocked(true);
          return;
        }

        setForm({
          restaurante: review.restaurante,
          calificacion: String(review.calificacion),
          fechaVisita: review.fechaVisita ? review.fechaVisita.split('T')[0] : '',
          observaciones: review.observaciones
        });
        setFormBlocked(false);
      } catch (requestError) {
        setError(requestError.response?.data?.message || 'No se pudo cargar la reseña');
        setFormBlocked(true);
      } finally {
        setLoading(false);
      }
    };

    loadReviewToEdit();
  }, [id, isEditing, user?.id]);

  const handleChange = (event) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const validateForm = () => {
    if (!form.restaurante || !form.calificacion || !form.fechaVisita || !form.observaciones) {
      return 'Todos los campos son obligatorios';
    }

    if (form.restaurante.trim().length < 2) return 'El nombre del restaurante debe tener al menos 2 caracteres';
    if (form.observaciones.trim().length < 10) return 'Las observaciones deben tener al menos 10 caracteres';
    if (isNaN(Date.parse(form.fechaVisita))) return 'La fecha de visita no es valida';

    const rating = Number(form.calificacion);
    if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
      return 'La calificacion debe ser un numero entre 1 y 5';
    }

    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setSaving(true);
      setError('');

      if (isEditing) {
        await updateReviewRequest(id, form);
      } else {
        await createReviewRequest(form);
      }

      navigate('/reviews');
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'No se pudo guardar la reseña');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <Loading text="Preparando formulario..." />;
  }

  return (
    <section className="auth-view">
      <form className="form-panel wide" onSubmit={handleSubmit}>
        <p className="eyebrow">Reseñas</p>
        <h1>{title}</h1>
        <ErrorMessage message={error} />

        <label>
          Nombre del Restaurante
          <input name="restaurante" value={form.restaurante} onChange={handleChange} disabled={formBlocked} />
        </label>

        <label>
          Fecha de Visita
          <input type="date" name="fechaVisita" value={form.fechaVisita} onChange={handleChange} disabled={formBlocked} />
        </label>

        <label>
          Calificación
          <select name="calificacion" value={form.calificacion} onChange={handleChange} disabled={formBlocked}>
            <option value="1">1 - Muy mala</option>
            <option value="2">2 - Mala</option>
            <option value="3">3 - Regular</option>
            <option value="4">4 - Buena</option>
            <option value="5">5 - Excelente</option>
          </select>
        </label>

        <label>
          Observaciones
          <textarea
            name="observaciones"
            rows="5"
            value={form.observaciones}
            onChange={handleChange}
            disabled={formBlocked}
          />
        </label>

        <button className="button primary full" type="submit" disabled={saving || formBlocked}>
          {saving ? 'Guardando...' : 'Guardar reseña'}
        </button>
      </form>
    </section>
  );
}

export default ReviewForm;
