import { Request, Response } from 'express';
import { PerritoModel } from '../models/perritos.models';

export const obtenerPerritos = async (_req: Request, res: Response) => {
  res.json(await PerritoModel.obtenerTodos());
};

export const obtenerPerritoPorId = async (req: Request, res: Response) => {
  const perrito = await PerritoModel.obtenerPorId(Number(req.params.id));
  if (!perrito) return res.status(404).json({ message: 'Perrito no encontrado' });
  res.json(perrito);
};

export const crearPerrito = async (req: Request, res: Response) => {
  res.status(201).json(await PerritoModel.crear(req.body));
};

export const actualizarPerrito = async (req: Request, res: Response) => {
  const perrito = await PerritoModel.actualizar(Number(req.params.id), req.body);
  if (!perrito) return res.status(404).json({ message: 'Perrito no encontrado' });
  res.json(perrito);
};

export const eliminarPerrito = async (req: Request, res: Response) => {
  const eliminado = await PerritoModel.eliminar(Number(req.params.id));
  if (!eliminado) return res.status(404).json({ message: 'Perrito no encontrado' });
  res.status(204).send();
};
