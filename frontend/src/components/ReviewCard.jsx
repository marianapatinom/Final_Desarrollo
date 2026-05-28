import { Link } from 'react-router-dom';
import { Edit, Star, Trash2 } from 'lucide-react';
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

  return (
    <article className="review-card">
      <div className="review-card__header">
        <div>
          <p className="restaurant">{review.restaurante}</p>
          <h3>{review.titulo}</h3>
        </div>
        <span className="rating">
          <Star size={16} fill="currentColor" />
          {review.calificacion}/5
        </span>
      </div>

      <p className="description">{review.descripcion}</p>

      <footer className="review-card__footer">
        <span>
          Por <strong>{review.usuario?.nombre || 'Usuario'}</strong> · {createdAt}
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
