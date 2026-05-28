import { Link } from 'react-router-dom';
import { PlusCircle, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

function Dashboard() {
  const { user } = useAuth();

  return (
    <section className="dashboard">
      <div className="dashboard-hero">
        <div>
          <p className="eyebrow">Panel privado</p>
          <h1>Hola, {user?.nombre}</h1>
          <p>Desde aqui puedes crear reseñas y administrar solo las que te pertenecen.</p>
        </div>
        <Link className="button primary" to="/reviews/new">
          <PlusCircle size={18} />
          Crear reseña
        </Link>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <Star size={22} />
          <strong>JWT activo</strong>
          <span>Tu token esta guardado en sessionStorage.</span>
        </div>
        <div className="stat-card">
          <PlusCircle size={22} />
          <strong>Permisos seguros</strong>
          <span>El backend valida el dueño antes de editar o eliminar.</span>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;
