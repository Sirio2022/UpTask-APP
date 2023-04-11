import Usuario from '../models/Usuario.js';
import generarId from '../helpers/generarId.js';
import generarJWT from '../helpers/generarJWT.js';

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
    usuario.token = generarId(); //Generar un token para el usuario. Este token se enviará por email para confirmar la cuenta.
    const usuarioAlmacenado = await usuario.save();
    res.json(usuarioAlmacenado);
  } catch (error) {
    console.log(error);
  }
};

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  //Comprobar si el usuario existe

  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error('El usuario no existe');
    return res.status(404).json({ Cuidado: error.message });
  }

  //Comprobar que el usuario está confirmado
  if (!usuario.confirmado) {
    const error = new Error('Tu cuenta no ha sido confirmada');
    return res.status(403).json({ Cuidado: error.message });
  }

  //Comprobar que el password es correcto

  if (await usuario.matchPassword(password)) {
    res.json({
      _id: usuario._id,
      nombre: usuario.nombre,
      email: usuario.email,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error('El password es incorrecto');
    return res.status(401).json({ Cuidado: error.message });
  }
};

const confirmarCuenta = async (req, res) => {
  const { token } = req.params;
  const usuarioConfirmar = await Usuario.findOne({ token });
  if (!usuarioConfirmar) {
    const error = new Error('Token no válido');
    return res.status(404).json({ Cuidado: error.message });
  }

  try {
    usuarioConfirmar.confirmado = true;
    usuarioConfirmar.token = null;
    await usuarioConfirmar.save();
    res.json({ mensaje: 'Cuenta confirmada' });
  } catch (error) {
    console.log(error);
  }
};

export { registrar, autenticar, confirmarCuenta };
