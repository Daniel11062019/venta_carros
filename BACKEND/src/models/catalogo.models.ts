import { obtenerSiguienteVehiculoId, vehiculosDB } from '../config/database';

export interface Vehiculo {
  idVehiculo: number;
  marca: string;
  modelo: string;
  anio: number;
  cc: number;
  precio: number;
  categoria: string;
}

export class CatalogoModel {
  static async obtenerTodos(): Promise<Vehiculo[]> {
    return vehiculosDB;
  }

  static async obtenerPorId(id: number): Promise<Vehiculo | null> {
    return vehiculosDB.find((vehiculo) => vehiculo.idVehiculo === id) || null;
  }

  static async crear(vehiculo: Omit<Vehiculo, 'idVehiculo'>): Promise<Vehiculo> {
    const nuevoVehiculo = { ...vehiculo, idVehiculo: obtenerSiguienteVehiculoId() };
    vehiculosDB.push(nuevoVehiculo);
    return nuevoVehiculo;
  }

  static async actualizar(id: number, datos: Partial<Vehiculo>): Promise<Vehiculo | null> {
    const indice = vehiculosDB.findIndex((vehiculo) => vehiculo.idVehiculo === id);
    if (indice === -1) return null;

    vehiculosDB[indice] = { ...vehiculosDB[indice], ...datos, idVehiculo: id };
    return vehiculosDB[indice];
  }

  static async eliminar(id: number): Promise<boolean> {
    const indice = vehiculosDB.findIndex((vehiculo) => vehiculo.idVehiculo === id);
    if (indice === -1) return false;

    vehiculosDB.splice(indice, 1);
    return true;
  }
}
