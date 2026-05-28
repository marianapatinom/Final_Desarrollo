import { Link, NavLink, useNavigate } from 'react-router-dom';
import { LogOut, PlusCircle, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext.jsx';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/reviews');
  };

  return (
    <header className="navbar">
      <Link to="/reviews" className="brand">
        <Star size={22} />
        RestoReviews
      </Link>

      <nav className="nav-links">
        <NavLink to="/reviews">Reseñas</NavLink>
        {isAuthenticated && <NavLink to="/dashboard">Dashboard</NavLink>}
        {isAuthenticated && (
          <NavLink to="/reviews/new" className="nav-action">
            <PlusCircle size={18} />
            Nueva
          </NavLink>
        )}
      </nav>

      <div className="nav-auth">
        {isAuthenticated ? (
          <>
            <span className="user-pill">{user?.nombre}</span>
            <button type="button" className="icon-button" onClick={handleLogout} title="Cerrar sesion">
              <LogOut size={18} />
            </button>
          </>
        ) : (
          <>
            <Link className="button ghost" to="/login">
              Login
            </Link>
            <Link className="button primary" to="/register">
              Registro
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
