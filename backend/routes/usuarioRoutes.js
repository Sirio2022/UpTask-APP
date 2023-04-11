import express from 'express';
const router = express.Router();
import {
  registrar,
  autenticar,
  confirmarCuenta,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
} from '../controllers/usuarioController.js';

// Autenticación, Registro y Confirmación de Usuarios
router.post('/', registrar); //Crear un nuevo usuario
router.post('/login', autenticar); //Iniciar sesión
router.get('/confirmar/:token', confirmarCuenta); //Confirmar cuenta (email). Se envía un token por email y es de una sola vez.
router.post('/olvide-password', olvidePassword); //Olvidé mi password. Se envía un token por email y es de una sola vez.
router.route('/olvide-password/:token').post(nuevoPassword).get(comprobarToken); //Se envía un token por email y es de una sola vez.

export default router;
