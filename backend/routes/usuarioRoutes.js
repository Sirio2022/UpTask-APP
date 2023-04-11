import express from 'express';
const router = express.Router();
import {
  registrar,
  autenticar,
  confirmarCuenta,
} from '../controllers/usuarioController.js';

// Autenticación, Registro y Confirmación de Usuarios
router.post('/', registrar); //Crear un nuevo usuario
router.post('/login', autenticar); //Iniciar sesión
router.get('/confirmar/:token', confirmarCuenta); //Confirmar cuenta (email). Se envía un token por email y es de una sola vez.

export default router;
