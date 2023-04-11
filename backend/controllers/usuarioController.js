import Usuario from '../models/Usuario.js';
import generarId from '../helpers/generarId.js';

const registrar = async (req, res) => {
  //Evitar que se registren usuarios con el mismo email
  const { email } = req.body;
  const existeUsuario = await Usuario.findOne({ email });
  if (existeUsuario) {
    const error = new Error('El usuario ya existe con ese Email');
    return res.status(400).json({ Cuidado: error.message });
  }

  try {
    const usuario = new Usuario(req.body);
    usuario.token = generarId(); //Generar un token para el usuario
    const usuarioAlmacenado = await usuario.save();
    res.json(usuarioAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

export { registrar };
