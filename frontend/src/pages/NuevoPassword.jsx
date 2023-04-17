export default function NuevoPassword() {
  return (
    <>
      <h1 className="text-sky-600 font-black text-6xl capitalize">
        Reestablece tu password y no pierdas acceso a tus{' '}
        <span className="text-slate-700">Proyectos</span>
      </h1>

      <form className="my-10 bg-white shadow-md rounded-lg p-10" action="">
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
          />
        </div>

        <input
          className="uppercase bg-sky-600 mb-5 text-white font-bold text-xl w-full py-3 rounded-xl hover:bg-sky-700 cursor-pointer transition-colors duration-300"
          type="submit"
          value="Reestablecer Password"
        />
      </form>
    </>
  );
}
