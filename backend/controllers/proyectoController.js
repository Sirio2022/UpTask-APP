import Proyecto from '../models/Proyecto.js';

const obtenerProyectos = async (req, res) => {
  const proyectos = await Proyecto.find({ creador: req.usuario._id });
  res.status(200).json(proyectos);
};

const nuevoProyecto = async (req, res) => {
  const proyecto = new Proyecto(req.body);
  proyecto.creador = req.usuario._id;
  try {
    const proyectoAlmacenado = await proyecto.save();
    res.status(201).json(proyectoAlmacenado);
  } catch (error) {
    res.status(400).json({ Cuidado: error.message });
  }
};

const obtenerProyecto = async (req, res) => {
  const { id } = req.params;

  const proyecto = await Proyecto.findById(id);

  if (!proyecto) {
    const error = new Error('El proyecto no existe');
    return res.status(404).json({ Cuidado: error.message });
  }
  if (proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error('No tienes los persmisos para ver este proyecto');
    return res.status(404).json({ Cuidado: error.message });
  }
  res.status(200).json(proyecto);
};

const editarProyecto = async (req, res) => {};

const eliminarProyecto = async (req, res) => {};

const agregarColaborador = async (req, res) => {};

const eliminarColaborador = async (req, res) => {};

const obtenerTareas = async (req, res) => {};

export {
  obtenerProyectos,
  nuevoProyecto,
  obtenerProyecto,
  editarProyecto,
  eliminarProyecto,
  agregarColaborador,
  eliminarColaborador,
  obtenerTareas,
};
