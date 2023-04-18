import { useState } from 'react';
import { Link } from 'react-router-dom';
import Alerta from '../components/Alerta';
import axios from 'axios';

export default function OlvidePassword() {
  const [email, setEmail] = useState('');
  const [alerta, setAlerta] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email === '') {
      setAlerta({
        msg: 'El email es obligatorio',
        error: true,
      });
      return;
    }

    try {
      //TODO: Mover hacia un cliente de axios
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/usuarios/olvide-password`,
        {
          email,
        }
      );
      setAlerta({
        msg: data.msg,
        error: false,
      });
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alerta;

  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Recupera tu acceso y administra tus{' '}
        <span className="text-slate-700">Proyectos</span>
      </h1>

      {msg && <Alerta alerta={alerta} />}

      <form
        className="my-10 bg-white shadow-md rounded-lg p-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="uppercase text-gray-600 block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="w-full  mt-3 p-3 border rounded-xl bg-gray-50"
            type="email"
            name="email"
            placeholder="Tu email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <input
          className="uppercase bg-sky-600 mb-5 text-white font-bold text-xl w-full py-3 rounded-xl hover:bg-sky-700 cursor-pointer transition-colors duration-300"
          type="submit"
          value="Enviar instrucciones"
        />
      </form>

      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 uppercase text-slate-500"
          to="/"
        >
          ¿Ya posees una cuenta?{' '}
          <span className="text-sky-600">Inicia sesión</span>
        </Link>
        <Link
          className="block text-center my-5 uppercase text-slate-500"
          to="/registrar"
        >
          ¿No tienes cuenta? <span className="text-sky-600">Regístrate</span>
        </Link>
      </nav>
    </>
  );
}
