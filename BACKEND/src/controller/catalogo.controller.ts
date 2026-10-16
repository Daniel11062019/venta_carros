import { Request, Response } from 'express';
import { CatalogoModel } from '../models/catalogo.models';

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
  const eliminado = await CatalogoModel.eliminar(Number(req.params.id));
  if (!eliminado) return res.status(404).json({ message: 'Vehículo no encontrado' });
  res.status(204).send();
};
