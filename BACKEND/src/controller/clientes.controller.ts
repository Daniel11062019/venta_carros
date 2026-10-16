import { Request, Response } from 'express';
import { ClienteModel } from '../models/clientes.models';

export const obtenerClientes = async (_req: Request, res: Response) => {
  res.json(await ClienteModel.obtenerTodos());
};

export const obtenerClientePorId = async (req: Request, res: Response) => {
  const cliente = await ClienteModel.obtenerPorId(Number(req.params.id));
  if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
  res.json(cliente);
};

export const crearCliente = async (req: Request, res: Response) => {
  res.status(201).json(await ClienteModel.crear(req.body));
};

export const actualizarCliente = async (req: Request, res: Response) => {
  const cliente = await ClienteModel.actualizar(Number(req.params.id), req.body);
  if (!cliente) return res.status(404).json({ message: 'Cliente no encontrado' });
  res.json(cliente);
};

export const eliminarCliente = async (req: Request, res: Response) => {
  const eliminado = await ClienteModel.eliminar(Number(req.params.id));
  if (!eliminado) return res.status(404).json({ message: 'Cliente no encontrado' });
  res.status(204).send();
};
