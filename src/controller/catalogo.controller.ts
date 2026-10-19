import { Request, Response } from 'express';
import { CatalogoModel } from '../models/catalogo.models';
import { CODIGO_PG, esCodigoPg } from '../middleware/eroror.middleware';

export const obtenerVehiculos = async (_req: Request, res: Response) => {
  res.json(await CatalogoModel.obtenerTodos());
};

export const obtenerVehiculoPorId = async (req: Request, res: Response) => {
  const vehiculo = await CatalogoModel.obtenerPorId(Number(req.params.id));
  if (!vehiculo) return res.status(404).json({ message: 'Vehículo no encontrado' });
  res.json(vehiculo);
};

export const crearVehiculo = async (req: Request, res: Response) => {
  res.status(201).json(await CatalogoModel.crear(req.body));
};

export const actualizarVehiculo = async (req: Request, res: Response) => {
  const vehiculo = await CatalogoModel.actualizar(Number(req.params.id), req.body);
  if (!vehiculo) return res.status(404).json({ message: 'Vehículo no encontrado' });
  res.json(vehiculo);
};

export const eliminarVehiculo = async (req: Request, res: Response) => {
  let eliminado: boolean;
  try {
    eliminado = await CatalogoModel.eliminar(Number(req.params.id));
  } catch (error) {
    if (esCodigoPg(error, CODIGO_PG.LLAVE_FORANEA)) {
      return res.status(409).json({ message: 'No se puede eliminar el vehículo porque tiene compras asociadas' });
    }
    throw error;
  }
  if (!eliminado) return res.status(404).json({ message: 'Vehículo no encontrado' });
  res.status(204).send();
};
