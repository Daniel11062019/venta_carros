import { Router } from 'express';
import {
  obtenerVehiculos,
  obtenerVehiculoPorId,
  crearVehiculo,
  actualizarVehiculo,
  eliminarVehiculo
} from '../controller/catalogo.controller';

const router = Router();
router.get('/', obtenerVehiculos);
router.get('/:id', obtenerVehiculoPorId);
router.post('/', crearVehiculo);
router.put('/:id', actualizarVehiculo);
router.delete('/:id', eliminarVehiculo);

export default router;
