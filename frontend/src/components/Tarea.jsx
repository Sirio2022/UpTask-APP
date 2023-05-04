import { formatearFecha } from '../helpers/FormatearFecha';
import useProyectos from '../hooks/useProyectos';
import useAdmin from '../hooks/useAdmin';

export default function Tarea({ tarea }) {
  const { handleModalEditarTarea, handleModalEliminarTarea, completarTarea } = useProyectos();
  const { descripcion, nombre, prioridad, fechaEntrega, _id, estado } = tarea;

  const admin = useAdmin();

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
        {admin && (
          <button
            onClick={() => handleModalEditarTarea(tarea)}
            type="button"
            className="   rounded-lg bg-indigo-600 px-5 py-3  text-sm font-bold uppercase text-white hover:bg-indigo-800"
          >
            editar
          </button>
        )}
        
        <button
            onClick={() => completarTarea(_id)}
            type="button"
            className={`${estado ? 'bg-sky-600' : 'bg-gray-600'} rounded-lg px-5 py-3 text-sm font-bold uppercase text-white hover:bg-green-800`}
          >
            {estado ? 'Completada' : 'Incompleta'}
          </button>
        {admin && (
          <button
            onClick={() => handleModalEliminarTarea(tarea)}
            type="button"
            className="rounded-lg   bg-red-600 px-5 py-3 text-sm  font-bold uppercase text-white hover:bg-red-800"
          >
            Eliminar
          </button>
        )}
      </div>
    </div>
  );
}
