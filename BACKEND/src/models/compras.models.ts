import { comprasDB, obtenerSiguienteCompraId } from '../config/database';

export interface Compra {
  idCompra: number;
  idCliente: number;
  cliente: string;
  cedula: string;
  idVehiculo: number;
  vehiculo: string;
  fecha: string;
  precio: number;
  estado: string;
}

export class CompraModel {
  static async obtenerTodos(): Promise<Compra[]> {
    return comprasDB;
  }

  static async obtenerPorId(id: number): Promise<Compra | null> {
    return comprasDB.find((compra) => compra.idCompra === id) || null;
  }

  static async crear(compra: Omit<Compra, 'idCompra'>): Promise<Compra> {
    const nuevaCompra = { ...compra, idCompra: obtenerSiguienteCompraId() };
    comprasDB.push(nuevaCompra);
    return nuevaCompra;
  }

  static async actualizar(id: number, datos: Partial<Compra>): Promise<Compra | null> {
    const indice = comprasDB.findIndex((compra) => compra.idCompra === id);
    if (indice === -1) return null;

    comprasDB[indice] = { ...comprasDB[indice], ...datos, idCompra: id };
    return comprasDB[indice];
  }

  static async eliminar(id: number): Promise<boolean> {
    const indice = comprasDB.findIndex((compra) => compra.idCompra === id);
    if (indice === -1) return false;

    comprasDB.splice(indice, 1);
    return true;
  }
}
