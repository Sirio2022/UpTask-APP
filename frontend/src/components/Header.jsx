import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="border-b bg-white px-4 py-5">
      <div className="md:flex md:justify-between">
        <h2 className="text-center text-4xl font-black text-sky-600">
          UpTask - MERN
        </h2>

        <input
          type="search"
          placeholder="Buscar Proyectos"
          className="block rounded-lg border p-2 lg:w-96"
        />

        <div className="flex items-center gap-4">
          <Link to="/proyectos" className="font-bold uppercase ">
            Proyectos
          </Link>

          <button
            type="button"
            className="rounded-md bg-sky-600 p-3 text-sm font-bold uppercase text-white"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    </header>
  );
}
