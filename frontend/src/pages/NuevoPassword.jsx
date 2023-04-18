import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import clienteAxios from '../config/clienteAxios';
import Alerta from '../components/Alerta';

export default function NuevoPassword() {
  const [tokenvalido, setTokenValido] = useState(false);
  const [alerta, setAlerta] = useState({});
  const [password, setPassword] = useState('');
  const [passwordModificado, setPasswordModificado] = useState(false);

  const params = useParams();

  const { token } = params;

  useEffect(() => {
    const comprobarToken = async () => {
      try {
        await clienteAxios.get(`/usuarios/olvide-password/${token}`);
        setTokenValido(true);
      } catch (error) {
        setAlerta({
          msg: error.response.data.msg,
          error: true,
        });
      }
    };
    return () => {
      comprobarToken();
    };
  }, []);

  const { msg } = alerta;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password.length < 6) {
      setAlerta({
        msg: 'La contraseña debe tener al menos 6 caracteres',
        error: true,
      });
      return;
    }

    try {
      const url = `${
        import.meta.env.VITE_BACKEND_URL
      }/api/usuarios/olvide-password/${token}`;
      const { data } = await axios.post(url, { password });
      setAlerta({
        msg: data.msg,
        error: false,
      });
      setPasswordModificado(true);
      setPassword('');
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reestablece tu password y no pierdas acceso a tus{' '}
        <span className="text-slate-700">Proyectos</span>
      </h1>
      {msg && <Alerta alerta={alerta} />}

      {tokenvalido && (
        <form
          className="my-10 bg-white shadow-md rounded-lg p-10"
          onSubmit={handleSubmit}
        >
          <div className="my-5">
            <label
              className="uppercase text-gray-600 block text-xl font-bold"
              htmlFor="password"
            >
              Nuevo Password
            </label>
            <input
              className="w-full  mt-3 p-3 border rounded-xl bg-gray-50"
              type="password"
              name="password"
              placeholder="Ingresa tu nuevo password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <input
            className="uppercase bg-sky-600 mb-5 text-white font-bold text-xl w-full py-3 rounded-xl hover:bg-sky-700 cursor-pointer transition-colors duration-300"
            type="submit"
            value="Reestablecer Password"
          />
        </form>
      )}
      {passwordModificado && (
        <Link
          className="block text-center my-5 uppercase text-slate-500"
          to="/"
        >
          <span className="text-sky-600">Inicia sesión</span>
        </Link>
      )}
    </>
  );
}
