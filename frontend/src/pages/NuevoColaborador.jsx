import FormularioColaborador from '../components/FormularioColaborador';

export default function NuevoColaborador() {
  return (
    <>
      <h1 className="text-4xl font-black">Añadir Colaborador(a)</h1>

      <div className="mt-10 flex justify-center">
        <FormularioColaborador />
      </div>
    </>
  );
}
