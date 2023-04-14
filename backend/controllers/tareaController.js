import Proyecto from '../models/Proyecto.js';
import Tarea from '../models/Tarea.js';

const agregarTarea = async (req, res) => {
  const { proyecto } = req.body;

  const existeProyecto = await Proyecto.findById(proyecto);

  if (!existeProyecto) {
    const error = new Error('El proyecto no existe');
    return res.status(404).json({ Cuidado: error.message });
  }

  if (existeProyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error(
      'No tienes los permisos para realizar esta acción, añadir una tarea'
    );
    return res.status(404).json({ Cuidado: error.message });
  }

  try {
    const tarea = await Tarea.create(req.body);
    res.status(201).json(tarea);
  } catch (error) {
    console.log(error);
  }
};

const obtenerTarea = async (req, res) => {
  const { id } = req.params;

  const existeTarea = await Tarea.findById(id).populate('proyecto');

  if (!existeTarea) {
    const error = new Error('La tarea no existe');
    return res.status(404).json({ Cuidado: error.message });
  }

  if (existeTarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error(
      'No tienes los permisos para realizar esta acción, obtener una tarea'
    );
    return res.status(403).json({ Cuidado: error.message });
  }

  try {
    res.status(200).json(existeTarea);
  } catch (error) {
    console.log(error);
  }
};

const editarTarea = async (req, res) => {
  const { id } = req.params;

  const existeTarea = await Tarea.findById(id).populate('proyecto');

  if (!existeTarea) {
    const error = new Error('La tarea no existe');
    return res.status(404).json({ Cuidado: error.message });
  }

  if (existeTarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error(
      'No tienes los permisos para realizar esta acción, editar esta tarea'
    );
    return res.status(403).json({ Cuidado: error.message });
  }

  const tareaActualizada = await Tarea.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.status(200).json(tareaActualizada);
};

const eliminarTarea = async (req, res) => {
  const { id } = req.params;

  const existeTarea = await Tarea.findById(id).populate('proyecto');

  if (!existeTarea) {
    const error = new Error('La tarea no existe');
    return res.status(404).json({ Cuidado: error.message });
  }

  if (existeTarea.proyecto.creador.toString() !== req.usuario._id.toString()) {
    const error = new Error(
      'No tienes los permisos para realizar esta acción, obtener una tarea'
    );
    return res.status(403).json({ Cuidado: error.message });
  }

  try {
    await Tarea.findByIdAndDelete(id);
    res.status(200).json({ Mensaje: 'Tarea eliminada con éxito' });
  } catch (error) {
    console.log(error);
  }
};

const cambiarEstadoTarea = async (req, res) => {};

export {
  agregarTarea,
  obtenerTarea,
  editarTarea,
  eliminarTarea,
  cambiarEstadoTarea,
};