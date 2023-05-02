import { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import useProyectos from '../hooks/useProyectos';
import ModalFormularioTarea from '../components/ModalFormularioTarea';
import ModalEliminarTarea from '../components/ModalEliminarTarea';
import Tarea from '../components/Tarea';
import Alerta from '../components/Alerta';

export default function Proyecto() {
  const params = useParams();
  const { obtenerProyecto, proyecto, cargando, handleModalTarea, alerta } =
    useProyectos();

  useEffect(() => {
    obtenerProyecto(params.id);
  }, []);

  const { nombre } = proyecto;

  if (cargando) return <p>Cargando...</p>;

  const { msg } = alerta;

  return (
    <>
      <div className="flex justify-between">
        <h1 className="text-4xl font-black">{nombre}</h1>

        <div className="flex items-center gap-2 text-gray-400 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
            />
          </svg>

          <Link
            to={`/proyectos/editar/${params.id}`}
            className="text-sm font-medium uppercase"
          >
            Editar
          </Link>
        </div>
      </div>

      <button
        onClick={handleModalTarea}
        type="button"
        className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-sky-400 px-5 py-3 text-center text-sm font-bold uppercase text-white md:w-auto"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="h-6 w-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        Nueva tarea
      </button>

      <p className="mt-10 text-xl font-bold">Tareas del proyecto</p>

      <div className="flex justify-center">
        <div className="w-full md:w-1/3 lg:w-1/4">
          {msg && <Alerta alerta={alerta} />}
        </div>
      </div>
      <div className="mt-10 rounded-lg bg-white shadow">
        {proyecto?.tareas?.length ? (
          proyecto.tareas.map((tarea) => (
            <Tarea key={tarea._id} tarea={tarea} />
          ))
        ) : (
          <p className="my-5 p-10 text-center">
            No hay tareas para este proyecto
          </p>
        )}
      </div>
      <ModalFormularioTarea />
      <ModalEliminarTarea />
    </>
  );
}
