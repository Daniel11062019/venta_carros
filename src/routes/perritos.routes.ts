import { Router } from 'express';
import {
  obtenerPerritos,
  obtenerPerritoPorId,
  crearPerrito,
  actualizarPerrito,
  eliminarPerrito
} from '../controller/perritos.controller';

const router = Router();
router.get('/', obtenerPerritos);
router.get('/:id', obtenerPerritoPorId);
router.post('/', crearPerrito);
router.put('/:id', actualizarPerrito);
router.delete('/:id', eliminarPerrito);

export default router;
