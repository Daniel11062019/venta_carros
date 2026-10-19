import { Request, Response } from 'express';
import { ClienteModel } from '../models/clientes.models';
import { CODIGO_PG, esCodigoPg } from '../middleware/eroror.middleware';

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
  let eliminado: boolean;
  try {
    eliminado = await ClienteModel.eliminar(Number(req.params.id));
  } catch (error) {
    if (esCodigoPg(error, CODIGO_PG.LLAVE_FORANEA)) {
      return res.status(409).json({ message: 'No se puede eliminar el cliente porque tiene compras asociadas' });
    }
    throw error;
  }
  if (!eliminado) return res.status(404).json({ message: 'Cliente no encontrado' });
  res.status(204).send();
};
