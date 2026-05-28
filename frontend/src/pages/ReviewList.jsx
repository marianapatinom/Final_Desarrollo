import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage.jsx';
import Loading from '../components/Loading.jsx';
import ReviewCard from '../components/ReviewCard.jsx';
import { useAuth } from '../context/AuthContext.jsx';
import { deleteReviewRequest, getReviewsRequest } from '../services/reviewService.js';

function ReviewList() {
  const { isAuthenticated } = useAuth();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const loadReviews = async () => {
    try {
      setLoading(true);
      const response = await getReviewsRequest();
      setReviews(response.data);
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'No se pudieron cargar las reseñas');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm('¿Quieres eliminar esta reseña?');
    if (!confirmed) return;

    try {
      await deleteReviewRequest(id);
      setReviews((currentReviews) => currentReviews.filter((review) => review._id !== id));
    } catch (requestError) {
      setError(requestError.response?.data?.message || 'No se pudo eliminar la reseña');
    }
  };

  return (
    <section className="reviews-view">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Comunidad</p>
          <h1>Reseñas de restaurantes</h1>
          <p>Todos pueden ver las opiniones publicadas por la comunidad.</p>
        </div>
        {isAuthenticated && (
          <Link className="button primary" to="/reviews/new">
            Crear reseña
          </Link>
        )}
      </div>

      <ErrorMessage message={error} />

      {loading ? (
        <Loading text="Cargando reseñas..." />
      ) : reviews.length === 0 ? (
        <div className="empty-state">Aun no hay reseñas publicadas.</div>
      ) : (
        <div className="reviews-grid">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ReviewList;
