export default function Alerta({ alerta }) {
  return (
    <div
      className={`${
        alerta.error ? 'from-red-400 to-red-600' : 'from-sky-400 to-sky-600'
      } bg-gradient-to-br p-4 mt-10 rounded-lg text-white font-bold text-center uppercase`}
    >
      {alerta.msg}
    </div>
  );
}
