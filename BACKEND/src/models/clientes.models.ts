import { clientesDB, obtenerSiguienteId } from '../config/database';

export interface Cliente {
  id?: number;
  nombre: string;
  apellido: string;
  cedula: string;
  telefono: string;
  sexo: string;
}

export class ClienteModel {
  static async obtenerTodos(): Promise<Cliente[]> {
    return clientesDB;
  }

  static async obtenerPorId(id: number): Promise<Cliente | null> {
    return clientesDB.find((cliente) => cliente.id === id) || null;
  }

  static async crear(cliente: Cliente): Promise<Cliente> {
    const nuevoCliente = { ...cliente, id: obtenerSiguienteId() };
    clientesDB.push(nuevoCliente);
    return nuevoCliente;
  }

  static async actualizar(id: number, datos: Cliente): Promise<Cliente | null> {
    const indice = clientesDB.findIndex((cliente) => cliente.id === id);
    if (indice === -1) return null;

    clientesDB[indice] = { ...clientesDB[indice], ...datos, id };
    return clientesDB[indice];
  }

  static async eliminar(id: number): Promise<boolean> {
    const indice = clientesDB.findIndex((cliente) => cliente.id === id);
    if (indice === -1) return false;

    clientesDB.splice(indice, 1);
    return true;
  }
}
