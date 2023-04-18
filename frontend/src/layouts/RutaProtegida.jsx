import { Outlet, Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

export default function RutaProtegida() {
  const { auth, cargando } = useAuth();
  if(cargando) return 'Cargando...';
  return (
    <>
      {auth._id ? 'Autenticado' : <Navigate to="/" />}
      <Outlet />
    </>
  );
}
