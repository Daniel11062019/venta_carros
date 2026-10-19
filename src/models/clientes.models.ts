import { construirSet, esIdValido, pool } from '../config/database';

export interface Cliente {
  id?: number;
  nombre: string;
  apellido: string;
  cedula: string;
  telefono: string;
  sexo: string;
}

const CAMPOS = 'id, nombre, apellido, cedula, telefono, sexo';

const COLUMNAS_ACTUALIZABLES: Record<string, string> = {
  nombre: 'nombre = ?',
  apellido: 'apellido = ?',
  cedula: 'cedula = ?',
  telefono: 'telefono = ?',
  sexo: 'sexo = ?'
};

export class ClienteModel {
  static async obtenerTodos(): Promise<Cliente[]> {
    const { rows } = await pool.query<Cliente>(`SELECT ${CAMPOS} FROM clientes ORDER BY id`);
    return rows;
  }

  static async obtenerPorId(id: number): Promise<Cliente | null> {
    if (!esIdValido(id)) return null;

    const { rows } = await pool.query<Cliente>(`SELECT ${CAMPOS} FROM clientes WHERE id = $1`, [id]);
    return rows[0] ?? null;
  }

  static async crear(cliente: Cliente): Promise<Cliente> {
    const { nombre, apellido, cedula, telefono, sexo } = cliente ?? ({} as Cliente);

    const { rows } = await pool.query<Cliente>(
      `INSERT INTO clientes (nombre, apellido, cedula, telefono, sexo)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING ${CAMPOS}`,
      [nombre, apellido, cedula, telefono, sexo]
    );
    return rows[0];
  }

  static async actualizar(id: number, datos: Cliente): Promise<Cliente | null> {
    if (!esIdValido(id)) return null;

    const { set, valores } = construirSet(datos as unknown as Record<string, unknown>, COLUMNAS_ACTUALIZABLES);
    if (!set) return this.obtenerPorId(id);

    const { rows } = await pool.query<Cliente>(
      `UPDATE clientes SET ${set} WHERE id = $${valores.length + 1} RETURNING ${CAMPOS}`,
      [...valores, id]
    );
    return rows[0] ?? null;
  }

  static async eliminar(id: number): Promise<boolean> {
    if (!esIdValido(id)) return false;

    const { rowCount } = await pool.query('DELETE FROM clientes WHERE id = $1', [id]);
    return (rowCount ?? 0) > 0;
  }
}
