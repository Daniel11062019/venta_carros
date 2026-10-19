import { construirSet, esIdValido, pool } from '../config/database';

export interface Vehiculo {
  idVehiculo: number;
  marca: string;
  modelo: string;
  anio: number;
  cc: number;
  precio: number;
  categoria: string;
}

const CAMPOS = 'id_vehiculo AS "idVehiculo", marca, modelo, anio, cc, precio, categoria';

const COLUMNAS_ACTUALIZABLES: Record<string, string> = {
  marca: 'marca = ?',
  modelo: 'modelo = ?',
  anio: 'anio = ?',
  cc: 'cc = ?',
  precio: 'precio = ?',
  categoria: 'categoria = ?'
};

export class CatalogoModel {
  static async obtenerTodos(): Promise<Vehiculo[]> {
    const { rows } = await pool.query<Vehiculo>(`SELECT ${CAMPOS} FROM catalogo ORDER BY id_vehiculo`);
    return rows;
  }

  static async obtenerPorId(id: number): Promise<Vehiculo | null> {
    if (!esIdValido(id)) return null;

    const { rows } = await pool.query<Vehiculo>(`SELECT ${CAMPOS} FROM catalogo WHERE id_vehiculo = $1`, [id]);
    return rows[0] ?? null;
  }

  static async crear(vehiculo: Omit<Vehiculo, 'idVehiculo'>): Promise<Vehiculo> {
    const { marca, modelo, anio, cc, precio, categoria } = vehiculo ?? ({} as Omit<Vehiculo, 'idVehiculo'>);

    const { rows } = await pool.query<Vehiculo>(
      `INSERT INTO catalogo (marca, modelo, anio, cc, precio, categoria)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING ${CAMPOS}`,
      [marca, modelo, anio, cc, precio, categoria]
    );
    return rows[0];
  }

  static async actualizar(id: number, datos: Partial<Vehiculo>): Promise<Vehiculo | null> {
    if (!esIdValido(id)) return null;

    const { set, valores } = construirSet(datos as Record<string, unknown>, COLUMNAS_ACTUALIZABLES);
    if (!set) return this.obtenerPorId(id);

    const { rows } = await pool.query<Vehiculo>(
      `UPDATE catalogo SET ${set} WHERE id_vehiculo = $${valores.length + 1} RETURNING ${CAMPOS}`,
      [...valores, id]
    );
    return rows[0] ?? null;
  }

  static async eliminar(id: number): Promise<boolean> {
    if (!esIdValido(id)) return false;

    const { rowCount } = await pool.query('DELETE FROM catalogo WHERE id_vehiculo = $1', [id]);
    return (rowCount ?? 0) > 0;
  }
}
