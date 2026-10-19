import { construirSet, esIdValido, pool } from '../config/database';

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

// La fecha se guarda como DATE y se expone como 'DD/MM/YYYY', igual que antes.
const CAMPOS = `id_compra AS "idCompra", id_cliente AS "idCliente", cliente, cedula,
  id_vehiculo AS "idVehiculo", vehiculo, to_char(fecha, 'DD/MM/YYYY') AS fecha, precio, estado`;

const COLUMNAS_ACTUALIZABLES: Record<string, string> = {
  idCliente: 'id_cliente = ?',
  cliente: 'cliente = ?',
  cedula: 'cedula = ?',
  idVehiculo: 'id_vehiculo = ?',
  vehiculo: 'vehiculo = ?',
  fecha: "fecha = to_date(?, 'DD/MM/YYYY')",
  precio: 'precio = ?',
  estado: 'estado = ?'
};

export class CompraModel {
  static async obtenerTodos(): Promise<Compra[]> {
    const { rows } = await pool.query<Compra>(`SELECT ${CAMPOS} FROM compras ORDER BY id_compra`);
    return rows;
  }

  static async obtenerPorId(id: number): Promise<Compra | null> {
    if (!esIdValido(id)) return null;

    const { rows } = await pool.query<Compra>(`SELECT ${CAMPOS} FROM compras WHERE id_compra = $1`, [id]);
    return rows[0] ?? null;
  }

  static async crear(compra: Omit<Compra, 'idCompra'>): Promise<Compra> {
    const { idCliente, cliente, cedula, idVehiculo, vehiculo, fecha, precio, estado } =
      compra ?? ({} as Omit<Compra, 'idCompra'>);

    const { rows } = await pool.query<Compra>(
      `INSERT INTO compras (id_cliente, cliente, cedula, id_vehiculo, vehiculo, fecha, precio, estado)
       VALUES ($1, $2, $3, $4, $5, to_date($6, 'DD/MM/YYYY'), $7, $8)
       RETURNING ${CAMPOS}`,
      [idCliente, cliente, cedula, idVehiculo, vehiculo, fecha, precio, estado]
    );
    return rows[0];
  }

  static async actualizar(id: number, datos: Partial<Compra>): Promise<Compra | null> {
    if (!esIdValido(id)) return null;

    const { set, valores } = construirSet(datos as Record<string, unknown>, COLUMNAS_ACTUALIZABLES);
    if (!set) return this.obtenerPorId(id);

    const { rows } = await pool.query<Compra>(
      `UPDATE compras SET ${set} WHERE id_compra = $${valores.length + 1} RETURNING ${CAMPOS}`,
      [...valores, id]
    );
    return rows[0] ?? null;
  }

  static async eliminar(id: number): Promise<boolean> {
    if (!esIdValido(id)) return false;

    const { rowCount } = await pool.query('DELETE FROM compras WHERE id_compra = $1', [id]);
    return (rowCount ?? 0) > 0;
  }
}
