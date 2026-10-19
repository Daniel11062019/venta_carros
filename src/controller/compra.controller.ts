import { Request, Response } from 'express';
import { CompraModel } from '../models/compras.models';

export const obtenerCompras = async (_req: Request, res: Response) => {
  res.json(await CompraModel.obtenerTodos());
};

export const obtenerCompraPorId = async (req: Request, res: Response) => {
  const compra = await CompraModel.obtenerPorId(Number(req.params.id));
  if (!compra) return res.status(404).json({ message: 'Compra no encontrada' });
  res.json(compra);
};

export const crearCompra = async (req: Request, res: Response) => {
  res.status(201).json(await CompraModel.crear(req.body));
};

export const actualizarCompra = async (req: Request, res: Response) => {
  const compra = await CompraModel.actualizar(Number(req.params.id), req.body);
  if (!compra) return res.status(404).json({ message: 'Compra no encontrada' });
  res.json(compra);
};

export const eliminarCompra = async (req: Request, res: Response) => {
  const eliminado = await CompraModel.eliminar(Number(req.params.id));
  if (!eliminado) return res.status(404).json({ message: 'Compra no encontrada' });
  res.status(204).send();
};
