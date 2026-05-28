import { Link } from 'react-router-dom';
import { Edit, Star, Trash2, Calendar } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

function ReviewCard({ review, onDelete }) {
  const { user } = useAuth();
  const ownerId = review.usuario?._id || review.usuario?.id;
  const isOwner = user?.id === ownerId;
  const createdAt = new Date(review.createdAt).toLocaleDateString('es-CO', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });

  const fechaVisita = review.fechaVisita
    ? new Date(review.fechaVisita).toLocaleDateString('es-CO', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC'
      })
    : 'No especificada';

  return (
    <article className="review-card">
      <div className="review-card__header">
        <div>
          <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', color: 'var(--primary-gold)', margin: 0 }}>
            {review.restaurante}
          </h3>
          <p style={{ display: 'flex', alignItems: 'center', gap: '6px', margin: '8px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <Calendar size={14} /> Visita: {fechaVisita}
          </p>
        </div>
        <span className="rating">
          <Star size={16} fill="currentColor" />
          {review.calificacion}/5
        </span>
      </div>

      <p className="description" style={{ fontStyle: 'italic' }}>
        "{review.observaciones}"
      </p>

      <footer className="review-card__footer">
        <span>
          Por <strong>{review.usuario?.nombre || 'Usuario'}</strong> · Creado el {createdAt}
        </span>

        {isOwner && (
          <div className="card-actions">
            <Link className="icon-button" to={`/reviews/${review._id}/edit`} title="Editar reseña">
              <Edit size={17} />
            </Link>
            <button
              type="button"
              className="icon-button danger"
              onClick={() => onDelete(review._id)}
              title="Eliminar reseña"
            >
              <Trash2 size={17} />
            </button>
          </div>
        )}
      </footer>
    </article>
  );
}

export default ReviewCard;
