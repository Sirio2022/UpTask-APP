import { Link } from 'react-router-dom';

export default function PreviewProyecto({ proyecto }) {
  const { nombre, _id, cliente } = proyecto;
  return (
    <div className="flex border-b p-5 ">
      <p className="flex-1">
        {nombre}
        <span className="text-sm uppercase text-gray-500"> - {cliente}</span>
      </p>

      <Link
        to={`${_id}`}
        className="ml-auto font-bold text-blue-500 hover:text-blue-700 "
      >
        Ver Proyecto
      </Link>
    </div>
  );
}
