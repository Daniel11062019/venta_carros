import { construirSet, esIdValido, pool } from '../config/database';

export interface Perrito {
  idPerrito: number;
  nombre: string;
  edad: number;
  raza: string;
  color: string;
}

const CAMPOS = 'id_perritos AS "idPerrito", nombre, edad, raza, color';

const COLUMNAS_ACTUALIZABLES: Record<string, string> = {
  nombre: 'nombre = ?',
  edad: 'edad = ?',
  raza: 'raza = ?',
  color: 'color = ?'
};

export class PerritoModel {
  static async obtenerTodos(): Promise<Perrito[]> {
    const { rows } = await pool.query<Perrito>(`SELECT ${CAMPOS} FROM perritos ORDER BY id_perritos`);
    return rows;
  }

  static async obtenerPorId(id: number): Promise<Perrito | null> {
    if (!esIdValido(id)) return null;

    const { rows } = await pool.query<Perrito>(`SELECT ${CAMPOS} FROM perritos WHERE id_perritos = $1`, [id]);
    return rows[0] ?? null;
  }

  static async crear(perrito: Omit<Perrito, 'idPerrito'>): Promise<Perrito> {
    const { nombre, edad, raza, color } = perrito ?? ({} as Omit<Perrito, 'idPerrito'>);

    const { rows } = await pool.query<Perrito>(
      `INSERT INTO perritos (nombre, edad, raza, color)
       VALUES ($1, $2, $3, $4)
       RETURNING ${CAMPOS}`,
      [nombre, edad, raza, color]
    );
    return rows[0];
  }

  static async actualizar(id: number, datos: Partial<Perrito>): Promise<Perrito | null> {
    if (!esIdValido(id)) return null;

    const { set, valores } = construirSet(datos as Record<string, unknown>, COLUMNAS_ACTUALIZABLES);
    if (!set) return this.obtenerPorId(id);

    const { rows } = await pool.query<Perrito>(
      `UPDATE perritos SET ${set} WHERE id_perritos = $${valores.length + 1} RETURNING ${CAMPOS}`,
      [...valores, id]
    );
    return rows[0] ?? null;
  }

  static async eliminar(id: number): Promise<boolean> {
    if (!esIdValido(id)) return false;

    const { rowCount } = await pool.query('DELETE FROM perritos WHERE id_perritos = $1', [id]);
    return (rowCount ?? 0) > 0;
  }
}
