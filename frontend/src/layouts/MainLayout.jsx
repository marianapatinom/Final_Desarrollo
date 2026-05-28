import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar.jsx';

function MainLayout() {
  return (
    <>
      <Navbar />
      <main className="page-shell">
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
