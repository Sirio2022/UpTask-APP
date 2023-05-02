import { formatearFecha } from '../helpers/FormatearFecha';
import useProyectos from '../hooks/useProyectos';

export default function Tarea({ tarea }) {
  const { handleModalEditarTarea, handleModalEliminarTarea } = useProyectos();
  const { descripcion, nombre, prioridad, fechaEntrega, _id, estado } = tarea;

  return (
    <div className="flex items-center justify-between border-b p-5">
      <div>
        <p className="mb-2 text-xl">{nombre}</p>
        <p className="mb-2 text-sm uppercase text-gray-500">{descripcion}</p>
        <p className="mb-2 text-sm font-bold">
          Fecha de entrega: {formatearFecha(fechaEntrega)}
        </p>
        <p className="mb-2 text-gray-600">Prioridad: {prioridad}</p>
      </div>

      <div className="flex gap-2">
        <button
          onClick={() => handleModalEditarTarea(tarea)}
          type="button"
          className="   rounded-lg bg-indigo-600 px-5 py-3  text-sm font-bold uppercase text-white hover:bg-indigo-800"
        >
          editar
        </button>
        {estado ? (
          <button
            type="button"
            className="   rounded-lg bg-gray-600 px-5 py-3  text-sm font-bold uppercase text-white hover:bg-gray-800"
          >
            Completa
          </button>
        ) : (
          <button
            type="button"
            className="   rounded-lg bg-sky-600 px-5 py-3  text-sm font-bold uppercase text-white hover:bg-sky-800"
          >
            Incompleta
          </button>
        )}

        <button
          onClick={() => handleModalEliminarTarea(tarea)}
          type="button"
          className="rounded-lg   bg-red-600 px-5 py-3 text-sm  font-bold uppercase text-white hover:bg-red-800"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
