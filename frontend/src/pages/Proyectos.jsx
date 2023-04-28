import useProyectos from '../hooks/useProyectos';
import PreviewProyecto from '../components/PreviewProyecto';

export default function Proyectos() {
  const { proyectos } = useProyectos();
  

  return (
    <>
      <h1 className="text-4xl font-black">Proyectos</h1>

      <div className="mt-10 rounded bg-white shadow">
        {proyectos.length ? (
          proyectos.map((proyecto) => (
            <PreviewProyecto key={proyecto._id} proyecto={proyecto} />
          ))
        ) : (
          <p className=" p-5 text-center uppercase  text-gray-600">
            No hay proyectos
          </p>
        )}
      </div>
    </>
  );
}
